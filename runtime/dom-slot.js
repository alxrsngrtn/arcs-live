/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
'use strict';

import assert from '../platform/assert-web.js';
import Slot from './slot.js';
import {DomContext, SetDomContext} from './dom-context.js';

let templates = new Map();

class DomSlot extends Slot {
  constructor(consumeConn, arc, containerKind) {
    super(consumeConn, arc);
    this._templateName = [this.consumeConn.particle.name, this.consumeConn.name].concat(
        Object.values(this.consumeConn.particle.connections).filter(conn => conn.type.isInterface).map(conn => conn.handle.id)).join('::');
    this._model = null;
    this._observer = this._initMutationObserver();
    this._containerKind = containerKind;
  }

  setContext(context) {
    let wasNull = true;
    if (this.getContext()) {
      this.getContext().clear();
      wasNull = false;
    }

    if (context) {
      if (!this.getContext()) {
        this._context = this._createDomContext();
      }
      this.getContext().initContext(context);
      if (!wasNull) {
        this._doRender();
      }
    } else {
      this._context = null;
    }
  }
  _createDomContext() {
    if (this.consumeConn.slotSpec.isSet) {
      return new SetDomContext(this._containerKind);
    }
    return new DomContext(null, this._containerKind);
  }
  _initMutationObserver() {
    return new MutationObserver(async () => {
      this._observer.disconnect();

      if (this.getContext()) {
        // Update inner slots.
        this.getContext().initInnerContexts(this.consumeConn.slotSpec);
        this.innerSlotsUpdateCallback(this);

        // Reactivate the observer.
        this.getContext().observe(this._observer);
      }
    });
  }
  isSameContext(context) {
    return this.getContext().isEqual(context);
  }

  getTemplate() {
    return templates.get(this._templateName);
  }

  // TODO(sjmiles): triggered when innerPEC sends Render message to outerPEC,
  // (usually by request of DomParticle::render())
  // `handler` is generated by caller (slot-composer::renderSlot())
  async setContent(content, handler) {
    if (!content || Object.keys(content).length == 0) {
      if (this.getContext()) {
        this.getContext().clear();
      }
      this._model = null;
      return;
    }
    if (!this.getContext()) {
      return;
    }
    if (content.template) {
      if (this.getTemplate()) {
        // Template is being replaced.
        this.getContext().clear();
      }
      templates.set(this._templateName, DomContext.createTemplateElement(content.template));
    }
    this.eventHandler = handler;
    if (Object.keys(content).indexOf('model') >= 0) {
      if (content.model) {
        this._model = Object.assign(content.model, await this.populateHandleDescriptions());
      } else {
        this._model = undefined;
      }
    }
    this._doRender();
  }

  _doRender() {
    assert(this.getContext());

    this.getContext().observe(this._observer);

    // Initialize template, if possible.
    if (this.getTemplate()) {
      this.getContext().stampTemplate(this.getTemplate(), this.eventHandler);
    }
    // else {
    // TODO: should trigger request to particle, if template missing?
    //}

    if (this._model) {
      this.getContext().updateModel(this._model);
    }
  }
  getInnerContext(slotName) {
    return this.getContext() && this.getContext().getInnerContext(slotName);
  }
  constructRenderRequest() {
    let request = ['model'];
    if (!this.getTemplate()) {
      request.push('template');
    }
    return request;
  }
  static findRootSlots(context) {
    return new DomContext(context, this._containerKind).findRootSlots(context);
  }
}

export default DomSlot;

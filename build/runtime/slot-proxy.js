/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * A representation of a consumed slot. Retrieved from a particle using
 * particle.getSlot(name)
 */
export class SlotProxy {
    constructor(apiPort, particle, slotName, providedSlots) {
        // eslint-disable-next-line func-call-spacing
        this.handlers = new Map();
        this.requestedContentTypes = new Set();
        this._isRendered = false;
        this.apiPort = apiPort;
        this.slotName = slotName;
        this.particle = particle;
        this.providedSlots = providedSlots;
    }
    get isRendered() {
        return this._isRendered;
    }
    /**
     * renders content to the slot.
     */
    render(content) {
        this.apiPort.Render(this.particle, this.slotName, content);
        Object.keys(content).forEach(key => { this.requestedContentTypes.delete(key); });
        // Slot is considered rendered, if a non-empty content was sent and all requested content types were fullfilled.
        this._isRendered = this.requestedContentTypes.size === 0 && (Object.keys(content).length > 0);
    }
    /**
     * registers a callback to be invoked when 'name' event happens.
     */
    registerEventHandler(name, f) {
        if (!this.handlers.has(name)) {
            this.handlers.set(name, []);
        }
        this.handlers.get(name).push(f);
    }
    clearEventHandlers(name) {
        this.handlers.set(name, []);
    }
    fireEvent(event) {
        for (const handler of this.handlers.get(event.handler) || []) {
            handler(event);
        }
    }
}
//# sourceMappingURL=slot-proxy.js.map
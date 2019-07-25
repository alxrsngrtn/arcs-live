/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { XenStateMixin } from '../../modalities/dom/components/xen/xen-state.js';
import { DomParticleBase } from './dom-particle-base.js';
/**
 * Particle that interoperates with DOM and uses a simple state system
 * to handle updates.
 */
export class DomParticle extends XenStateMixin(DomParticleBase) {
    /**
     * Override if necessary, to do things when props change.
     */
    willReceiveProps(...args) {
    }
    /**
     * Override if necessary, to modify superclass config.
     */
    update(...args) {
    }
    /**
     * Override to return false if the Particle won't use
     * it's slot.
     */
    shouldRender(...args) {
        return true;
    }
    /**
     * Override to return a dictionary to map into the template.
     */
    render(...args) {
        return {};
    }
    /**
     * Copy values from `state` into the particle's internal state,
     * triggering an update cycle unless currently updating.
     */
    setState(state) {
        return this._setState(state);
    }
    /**
     * Getters and setters for working with state/props.
     */
    get state() {
        return this._state;
    }
    /**
     * Syntactic sugar: `this.state = {state}` is equivalent to `this.setState(state)`.
     */
    set state(state) {
        this.setState(state);
    }
    get props() {
        return this._props;
    }
    /**
     * Override if necessary, to modify superclass config.
     */
    get config() {
        // TODO(sjmiles): getter that does work is a bad idea, this is temporary
        return {
            handleNames: this.spec.inputs.map(i => i.name),
            // TODO(mmandlis): this.spec needs to be replaced with a particle-spec loaded from
            // .arcs files, instead of .ptcl ones.
            slotNames: this.spec.slandleConnectionNames()
        };
    }
    // affordances for aliasing methods to remove `_`
    _willReceiveProps(...args) {
        this.willReceiveProps(...args);
    }
    _update(...args) {
        this.update(...args);
        if (this.shouldRender(...args)) { // TODO: should shouldRender be slot specific?
            this.relevance = 1; // TODO: improve relevance signal.
        }
        this.config.slotNames.forEach(s => this.renderSlot(s, ['model']));
    }
    _async(fn) {
        // asynchrony in Particle code must be bookended with start/doneBusy
        this.startBusy();
        const done = () => {
            try {
                fn.call(this);
            }
            finally {
                this.doneBusy();
            }
        };
        // TODO(sjmiles): superclass uses Promise.resolve(),
        // but here use a short timeout for a wider debounce
        return setTimeout(done, 10);
    }
    async setHandles(handles) {
        this.configureHandles(handles);
        this.handles = handles;
        // TODO(sjmiles): we must invalidate at least once, is there a way to know
        // whether handleSync/update will be called?
        this._invalidate();
    }
    /**
     * This is called once during particle setup. Override to control sync and update
     * configuration on specific handles (via their configure() method).
     * `handles` is a map from names to handle instances.
     */
    configureHandles(handles) {
        // Example: handles.get('foo').configure({keepSynced: false});
    }
    async onHandleSync(handle, model) {
        this._setProperty(handle.name, model);
    }
    async onHandleUpdate({ name }, { data, added, removed }) {
        if (data !== undefined) {
            //console.log('update.data:', JSON.stringify(data, null, '  '));
            this._setProps({ [name]: data });
        }
        if (added) {
            //console.log('update.added:', JSON.stringify(added, null, '  '));
            const prop = (this.props[name] || []).concat(added);
            // TODO(sjmiles): generally improper to set `this._props` directly, this is a special case
            this._props[name] = prop;
            this._setProps({ [name]: prop });
        }
        if (removed) {
            //console.log('update.removed:', JSON.stringify(removed, null, '  '));
            const prop = this.props[name];
            if (Array.isArray(prop)) {
                removed.forEach(removed => {
                    // TODO(sjmiles): linear search is inefficient
                    const index = prop.findIndex(entry => this.idFor(entry) === this.idFor(removed));
                    if (index >= 0) {
                        prop.splice(index, 1);
                    }
                    else {
                        console.warn(`dom-particle::onHandleUpdate: couldn't find item to remove`);
                    }
                });
                this._setProps({ [name]: prop });
            }
        }
    }
    fireEvent(slotName, { handler, data }) {
        if (this[handler]) {
            // TODO(sjmiles): remove `this._state` parameter
            this[handler]({ data }, this._state);
        }
    }
    debounce(key, func, delay) {
        const subkey = `_debounce_${key}`;
        const state = this.state;
        if (!state[subkey]) {
            state[subkey] = true;
            this.startBusy();
        }
        const idleThenFunc = () => {
            this.doneBusy();
            func();
            state[subkey] = null;
        };
        // TODO(sjmiles): rewrite Xen debounce so caller has idle control
        super._debounce(key, idleThenFunc, delay);
    }
}
//# sourceMappingURL=dom-particle.js.map
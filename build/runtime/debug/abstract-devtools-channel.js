/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../../platform/assert-web.js';
export class AbstractDevtoolsChannel {
    constructor() {
        this.debouncedMessages = [];
        this.messageListeners = new Map();
        this.timer = null;
    }
    send(message) {
        this.ensureNoCycle(message);
        this.debouncedMessages.push(message);
        // Temporary workaround for WebRTC slicing messages above 2^18 characters.
        // Need to find a proper fix. Is there some config in WebRTC to fix this?
        // If not prefer to slice messages based on their serialized form.
        // Maybe zip them for transport?
        if (this.debouncedMessages.length > 10) {
            this._empty();
        }
        else if (!this.timer) {
            this.timer = setTimeout(() => this._empty(), 100);
        }
    }
    listen(arcOrId, messageType, listener) {
        assert(messageType);
        assert(arcOrId);
        const arcId = typeof arcOrId === 'string' ? arcOrId : arcOrId.id.toString();
        const key = `${arcId}/${messageType}`;
        let listeners = this.messageListeners.get(key);
        if (!listeners) {
            this.messageListeners.set(key, listeners = []);
        }
        listeners.push(listener);
    }
    forArc(arc) {
        return new ArcDevtoolsChannel(arc, this);
    }
    _handleMessage(msg) {
        const listeners = this.messageListeners.get(`${msg.arcId}/${msg.messageType}`);
        if (!listeners) {
            console.warn(`No one is listening to ${msg.messageType} message`);
        }
        else {
            for (const listener of listeners) {
                listener(msg);
            }
        }
    }
    _empty() {
        this._flush(this.debouncedMessages);
        this.debouncedMessages = [];
        clearTimeout(this.timer);
        this.timer = null;
    }
    _flush(_messages) {
        throw new Error('Not implemented in an abstract class');
    }
    // tslint:disable-next-line: no-any
    ensureNoCycle(object, objectPath = []) {
        if (!object || typeof object !== 'object')
            return;
        assert(objectPath.indexOf(object) === -1, 'Message cannot contain a cycle');
        objectPath.push(object);
        (Array.isArray(object) ? object : Object.values(object)).forEach(element => this.ensureNoCycle(element, objectPath));
        objectPath.pop();
    }
}
export class ArcDevtoolsChannel {
    constructor(arc, channel) {
        this.channel = channel;
        this.arcId = arc.id.toString();
    }
    send(message) {
        this.channel.send({
            meta: { arcId: this.arcId },
            ...message
        });
    }
    listen(messageType, callback) {
        this.channel.listen(this.arcId, messageType, callback);
    }
    static instantiateListener(listenerClass, arc, channel) {
        return new listenerClass(arc, channel);
    }
}
export class ArcDebugListener {
    constructor(_arc, _channel) { }
}
//# sourceMappingURL=abstract-devtools-channel.js.map
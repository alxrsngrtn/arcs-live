/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { now } from '../../../platform/date-web.js';
const defaultDefaultReplanDelayMs = 3000;
export class ReplanQueue {
    constructor(planProducer, options = {}) {
        this.options = {};
        this.planProducer = planProducer;
        this.options = options;
        this.options.defaultReplanDelayMs =
            this.options.defaultReplanDelayMs || defaultDefaultReplanDelayMs;
        this.changes = [];
        this.replanTimer = null;
        this.planProducer.registerStateChangedCallback(this._onPlanningStateChanged.bind(this));
    }
    addChange() {
        this.changes.push(now());
        if (this._isReplanningScheduled()) {
            this._postponeReplan();
        }
        else if (!this.planProducer.isPlanning) {
            this._scheduleReplan(this.options.defaultReplanDelayMs);
        }
    }
    _onPlanningStateChanged(isPlanning) {
        if (isPlanning) {
            // Cancel scheduled planning.
            this._cancelReplanIfScheduled();
            this.changes = [];
        }
        else if (this.changes.length > 0) {
            // Schedule delayed planning.
            const timeNow = now();
            this.changes.forEach((ch, i) => this.changes[i] = timeNow);
            this._scheduleReplan(this.options.defaultReplanDelayMs);
        }
    }
    _isReplanningScheduled() {
        return Boolean(this.replanTimer);
    }
    _scheduleReplan(intervalMs) {
        this._cancelReplanIfScheduled();
        this.replanTimer = setTimeout(() => this.planProducer.producePlans(), intervalMs);
    }
    _cancelReplanIfScheduled() {
        if (this._isReplanningScheduled()) {
            clearTimeout(this.replanTimer);
            this.replanTimer = null;
        }
    }
    _postponeReplan() {
        if (this.changes.length <= 1) {
            return;
        }
        const now = this.changes[this.changes.length - 1];
        const sinceFirstChangeMs = now - this.changes[0];
        if (this._canPostponeReplan(sinceFirstChangeMs)) {
            this._cancelReplanIfScheduled();
            let nextReplanDelayMs = this.options.defaultReplanDelayMs;
            if (this.options.maxNoReplanMs) {
                nextReplanDelayMs = Math.min(nextReplanDelayMs, this.options.maxNoReplanMs - sinceFirstChangeMs);
            }
            this._scheduleReplan(nextReplanDelayMs);
        }
    }
    _canPostponeReplan(changesInterval) {
        return !this.options.maxNoReplanMs || changesInterval < this.options.maxNoReplanMs;
    }
}
//# sourceMappingURL=replan-queue.js.map
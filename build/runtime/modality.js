/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../platform/assert-web.js';
var ModalityName;
(function (ModalityName) {
    ModalityName["Dom"] = "dom";
    ModalityName["DomTouch"] = "domTouch";
    ModalityName["Vr"] = "vr";
    ModalityName["Voice"] = "voice";
})(ModalityName || (ModalityName = {}));
export class Modality {
    // `all` true means modality is non restricted and any modality is compatible.
    // Otherwise, the `names` field in Modality contains the restrictive list of
    // modalities (an empty list stands for no suitable modalities being available).
    constructor(all, names = []) {
        this.all = all;
        this.names = names;
    }
    static create(names) {
        assert(names != null);
        return new Modality(false, names);
    }
    intersection(other) {
        if (this.all && other.all) {
            return new Modality(true, []);
        }
        if (this.all) {
            return new Modality(false, other.names);
        }
        return new Modality(false, this.names.filter(name => other.all || other.names.includes(name)));
    }
    static intersection(modalities) {
        return modalities.reduce((modality, total) => modality.intersection(total), Modality.all);
    }
    union(other) {
        if (this.all || other.all) {
            return Modality.all;
        }
        return new Modality(false, [...new Set(this.names.concat(other.names))]);
    }
    static union(modalities) {
        return modalities.length === 0
            ? Modality.all
            : modalities.reduce((modality, total) => modality.union(total), Modality.create([]));
    }
    isResolved() {
        return this.all || this.names.length > 0;
    }
    isCompatible(names) {
        return this.intersection(Modality.create(names)).isResolved();
    }
    static get Name() { return ModalityName; }
}
Modality.all = new Modality(true, []);
Modality.dom = new Modality(false, [Modality.Name.Dom]);
Modality.domTouch = new Modality(false, [Modality.Name.DomTouch]);
Modality.voice = new Modality(false, [Modality.Name.Voice]);
Modality.vr = new Modality(false, [Modality.Name.Vr]);
//# sourceMappingURL=modality.js.map
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../platform/assert-web.js';
import { fetch } from '../platform/fetch-web.js';
import { fs } from '../platform/fs-web.js';
import { vm } from '../platform/vm-web.js';
import { JsonldToManifest } from './converters/jsonldToManifest.js';
import { DomParticle } from './dom-particle.js';
import { MultiplexerDomParticle } from './multiplexer-dom-particle.js';
import { Particle } from './particle.js';
import { ClientReference } from './reference.js';
import { TransformationDomParticle } from './transformation-dom-particle.js';
const html = (strings, ...values) => (strings[0] + values.map((v, i) => v + strings[i + 1]).join('')).trim();
function schemaLocationFor(name) {
    return `../entities/${name}.schema`;
}
export class Loader {
    path(fileName) {
        return fileName.replace(/[/][^/]+$/, '/');
    }
    join(prefix, path) {
        if (/^https?:\/\//.test(path)) {
            return path;
        }
        // TODO: replace this with something that isn't hacky
        if (path[0] === '/' || path[1] === ':') {
            return path;
        }
        prefix = this.path(prefix);
        path = this.normalizeDots(`${prefix}${path}`);
        return path;
    }
    // convert `././foo/bar/../baz` to `./foo/baz`
    normalizeDots(path) {
        // only unix slashes
        path = path.replace(/\\/g, '/');
        // remove './'
        path = path.replace(/\/\.\//g, '/');
        // remove 'foo/..'
        const norm = s => s.replace(/(?:^|\/)[^./]*\/\.\./g, '');
        for (let n = norm(path); n !== path; path = n, n = norm(path))
            ;
        // remove '//' except after `:`
        path = path.replace(/([^:])(\/\/)/g, '$1/');
        return path;
    }
    async loadResource(file) {
        if (/^https?:\/\//.test(file)) {
            return this._loadURL(file);
        }
        return this._loadFile(file, 'utf-8');
    }
    async loadBinary(file) {
        if (/^https?:\/\//.test(file)) {
            return fetch(file).then(res => res.arrayBuffer());
        }
        else {
            return this._loadFile(file, null);
        }
    }
    async _loadFile(file, encoding) {
        return new Promise((resolve, reject) => {
            fs.readFile(file, { encoding }, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(encoding ? data : data.buffer);
                }
            });
        });
    }
    async _loadURL(url) {
        if (/\/\/schema.org\//.test(url)) {
            if (url.endsWith('/Thing')) {
                return fetch('https://schema.org/Product.jsonld').then(res => res.text()).then(data => JsonldToManifest.convert(data, { '@id': 'schema:Thing' }));
            }
            return fetch(url + '.jsonld').then(res => res.text()).then(data => JsonldToManifest.convert(data));
        }
        return fetch(url).then(res => res.text());
    }
    /**
     * Returns a particle class implementation by loading and executing
     * the code defined by a particle.  In the following example `x.js`
     * will be loaded and executed:
     *
     * ```
     * Particle foo in 'x.js'
     * ```
     */
    async loadParticleClass(spec) {
        const clazz = await this.requireParticle(spec.implFile);
        clazz.spec = spec;
        return clazz;
    }
    /**
     * Loads a particle class from the given filename by loading the
     * script contained in `fileName` and executing it as a script.
     *
     * Protected for use in tests.
     */
    async requireParticle(fileName) {
        if (fileName === null)
            fileName = '';
        const src = await this.loadResource(fileName);
        // Note. This is not real isolation.
        const script = new vm.Script(src, { filename: fileName, displayErrors: true });
        const result = [];
        const self = {
            defineParticle(particleWrapper) {
                result.push(particleWrapper);
            },
            console,
            fetch,
            setTimeout,
            importScripts: s => null //console.log(`(skipping browser-space import for [${s}])`)
        };
        script.runInNewContext(self, { filename: fileName, displayErrors: true });
        assert(result.length > 0 && typeof result[0] === 'function', `Error while instantiating particle implementation from ${fileName}`);
        return this.unwrapParticle(result[0]);
    }
    setParticleExecutionContext(pec) {
        this.pec = pec;
    }
    /**
     * executes the defineParticle() code and returns the results which should be a class definition.
     */
    unwrapParticle(particleWrapper) {
        assert(this.pec);
        return particleWrapper({ Particle, DomParticle, TransformationDomParticle, MultiplexerDomParticle, Reference: ClientReference.newClientReference(this.pec), html });
    }
}
//# sourceMappingURL=loader.js.map
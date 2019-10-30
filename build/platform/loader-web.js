/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { logsFactory } from './logs-factory.js';
import { LoaderBase } from './loader-base.js';
const { warn } = logsFactory('loader-web', 'green');
export class Loader extends LoaderBase {
    clone() {
        return new Loader(this.urlMap);
    }
    flushCaches() {
        // punt object urls?
    }
    async loadFile(path) {
        return this.loadUrl(path);
    }
    async loadBinaryFile(path) {
        return this.loadBinaryUrl(path);
    }
    async provisionObjectUrl(fileName) {
        // TODO(sjmiles): BLOB Urls don't work for binary content (.wasm), mime-type?
        if (!fileName || fileName.endsWith('.wasm')) {
            return null;
        }
        else {
            const raw = await this.loadResource(fileName);
            const path = this.resolve(fileName);
            const code = `${raw}\n//# sourceURL=${path}`;
            return URL.createObjectURL(new Blob([code], { type: 'application/javascript' }));
        }
    }
    async requireParticle(unresolvedPath, blobUrl) {
        // inject path to this particle into the UrlMap,
        // allows Foo particle to invoke `importScripts(resolver('$here/othermodule.js'))`
        this.mapParticleUrl(unresolvedPath);
        // resolve path
        const resolvedPath = this.resolve(unresolvedPath);
        // resolve target
        const url = blobUrl || resolvedPath;
        // load wrapped particle
        const wrapper = this.loadWrappedParticle(url, resolvedPath);
        // unwrap particle wrapper, if we have one
        if (wrapper) {
            return this.unwrapParticle(wrapper, this.provisionLogger(unresolvedPath));
        }
    }
    loadWrappedParticle(url, path) {
        let result;
        // MUST be synchronous from here until deletion
        // of self.defineParticle because we share this
        // scope with other particles
        // TODO fix usage of quoted property
        self['defineParticle'] = particleWrapper => {
            if (result) {
                warn('multiple particles not supported, last particle wins');
            }
            // multiple particles not supported: last particle wins
            result = particleWrapper;
        };
        try {
            // import (execute) particle code
            importScripts(url);
        }
        catch (e) {
            e.message = `Error loading Particle from '${path}': ${e.message}`;
            throw e;
        }
        finally {
            // clean up
            delete self['defineParticle'];
        }
        return result;
    }
}
//# sourceMappingURL=loader-web.js.map
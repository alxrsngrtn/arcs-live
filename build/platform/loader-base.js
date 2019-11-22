/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from './assert-web.js';
import { fetch } from './fetch-web.js';
import { JsonldToManifest } from '../runtime/converters/jsonldToManifest.js';
import { ClientReference } from '../runtime/reference.js';
import { Particle } from '../runtime/particle.js';
import { DomParticle } from '../runtime/dom-particle.js';
import { TransformationDomParticle } from '../runtime/transformation-dom-particle.js';
import { MultiplexerDomParticle } from '../runtime/multiplexer-dom-particle.js';
import { UiParticle } from '../runtime/ui-particle.js';
import { UiMultiplexerParticle } from '../runtime/ui-multiplexer-particle.js';
import { html } from '../runtime/html.js';
import { logsFactory } from '../platform/logs-factory.js';
const { warn } = logsFactory('Loader', 'green');
const isString = s => (typeof s === 'string');
const isSchemaOrgUrl = (s) => /\/\/schema.org\//.test(s);
// a qualified url is an absolute path with `https` protocol
const isQualifiedUrl = (s) => /^https?:\/\//.test(s);
/**
 * Key public API:
 *   async loadResource(file: string): Promise<string>
 *   async loadBinaryResource(file: string): Promise<ArrayBuffer>
 *   async loadParticleClass(spec: ParticleSpec): Promise<typeof Particle>
 */
export class LoaderBase {
    constructor(urlMap = {}, staticMap = {}) {
        this.urlMap = urlMap;
        this.staticMap = staticMap;
        this.compileRegExp(urlMap);
    }
    setParticleExecutionContext(pec) {
        this.pec = pec;
    }
    flushCaches() {
        // as needed
    }
    // TODO(sjmiles): XXX and XXXBinary methods are forked for type-safety (is there a way to be more DRY?)
    async loadResource(file) {
        const content = this.loadStatic(file);
        if (content) {
            return content;
        }
        const path = this.resolve(file);
        if (isQualifiedUrl(path)) {
            return this.loadUrl(path);
        }
        return this.loadFile(path);
    }
    async loadBinaryResource(file) {
        const content = this.loadStaticBinary(file);
        if (content) {
            return content;
        }
        const path = this.resolve(file);
        if (isQualifiedUrl(path)) {
            return this.loadBinaryUrl(path);
        }
        return this.loadBinaryFile(path);
    }
    loadStatic(path) {
        const content = this.staticMap[path];
        if (content && !isString(content)) {
            throw new Error('Cannot load static binary content as string');
        }
        return content;
    }
    loadStaticBinary(path) {
        const content = this.staticMap[path];
        if (content) {
            if (content instanceof ArrayBuffer) {
                return content;
            }
            throw new Error('Cannot load static string content as binary');
        }
        return null;
    }
    async loadUrl(url) {
        if (isSchemaOrgUrl(url)) {
            return this.loadSchemaOrgUrl(url);
        }
        return this.fetchString(url);
    }
    async fetchString(url) {
        const res = await fetch(url);
        if (res.ok) {
            return res.text();
        }
        return Promise.reject(new Error(`HTTP ${res.status}: ${res.statusText}`));
    }
    async loadBinaryUrl(url) {
        return this.fetchBuffer(url);
    }
    async fetchBuffer(url) {
        const res = await fetch(url);
        if (res.ok) {
            return res.arrayBuffer();
        }
        return Promise.reject(new Error(`HTTP ${res.status}: ${res.statusText} for ${url}`));
    }
    //
    // TODO(sjmiles): public because it's used in manifest.ts, can we simplify?
    join(prefix, path) {
        if (isQualifiedUrl(path)) {
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
    // TODO(sjmiles): public because it's used in manifest.ts, can we simplify?
    path(fileName) {
        return fileName.replace(/[/][^/]+$/, '/');
    }
    // convert `././foo/bar/../baz` to `./foo/baz`
    normalizeDots(path) {
        path = path || '';
        // only unix slashes
        path = path.replace(/\\/g, '/');
        // remove './'
        path = path.replace(/\/\.\//g, '/');
        // remove 'foo/..'
        const norm = s => s.replace(/(?:^|\/)[^./]*\/\.\./g, '');
        // keep removing `<name>/..` until there are no more
        for (let n = norm(path); n !== path; path = n, n = norm(path))
            ;
        // remove '//' except after `:`
        path = path.replace(/([^:])(\/\/)/g, '$1/');
        return path;
    }
    resolve(path) {
        const resolved = this.resolvePath(path);
        const compact = this.normalizeDots(resolved);
        return compact;
    }
    resolvePath(path) {
        let resolved = path;
        // TODO(sjmiles): inefficient
        // find longest key in urlMap that is a prefix of path
        const macro = this.findUrlMapMacro(path);
        if (macro) {
            const config = this.urlMap[macro];
            if (isString(config)) {
                resolved = `${config}${path.slice(macro.length)}`;
            }
            else {
                resolved = this.resolveConfiguredPath(path, macro, config);
            }
        }
        return resolved;
    }
    findUrlMapMacro(path) {
        // TODO(sjmiles): inefficient
        // find longest key in urlMap that is a prefix of path
        return Object.keys(this.urlMap).sort((a, b) => b.length - a.length).find(k => isString(path) && (path.slice(0, k.length) === k));
    }
    resolveConfiguredPath(path, macro, config) {
        return [
            config.root,
            (path.match(config.compiledRegex) ? config.buildDir : ''),
            (config.path || ''),
            path.slice(macro.length)
        ].join('');
    }
    mapParticleUrl(path) {
        if (!path) {
            return undefined;
        }
        const resolved = this.resolve(path);
        const parts = resolved.split('/');
        parts.pop();
        const folder = parts.join('/');
        this.urlMap['$here'] = folder;
        this.urlMap['$module'] = folder;
    }
    async loadSchemaOrgUrl(url) {
        let href = `${url}.jsonld`;
        let opts = null;
        if (url.endsWith('/Thing')) {
            href = 'https://schema.org/Product.jsonld';
            opts = { '@id': 'schema:Thing' };
        }
        const data = await this.fetchString(href);
        return JsonldToManifest.convert(data, opts);
    }
    async provisionObjectUrl(fileName) {
        // no facility for this by default
        return null;
    }
    //
    // Below here invoked from inside isolation scope (e.g. Worker)
    //
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
        let particleClass = null;
        const userClass = await this.requireParticle(spec.implFile || '', spec.implBlobUrl);
        if (!userClass) {
            warn(`[${spec.implFile}]::defineParticle() returned no particle.`);
        }
        else {
            particleClass = userClass;
            particleClass.spec = spec;
        }
        return particleClass;
    }
    /**
     * executes the defineParticle() code and returns the results which should be a class definition.
     */
    unwrapParticle(particleWrapper, log) {
        assert(this.pec);
        return particleWrapper({
            // Particle base
            Particle,
            // Dom-flavored Particles (deprecated?)
            DomParticle,
            MultiplexerDomParticle,
            TransformationDomParticle,
            // Ui-flavored Particles
            UiParticle,
            UiMultiplexerParticle,
            // Aliases
            ReactiveParticle: UiParticle,
            SimpleParticle: UiParticle,
            // utilities
            Reference: ClientReference.newClientReference(this.pec),
            resolver: this.resolve.bind(this),
            log: log || (() => { }),
            html
        });
    }
    provisionLogger(fileName) {
        return logsFactory(fileName.split('/').pop(), '#1faa00').log;
    }
    compileRegExp(urlMap) {
        for (const config of Object.values(urlMap)) {
            if (typeof config === 'string')
                continue;
            config.compiledRegex = RegExp(config.buildOutputRegex);
        }
    }
}
//# sourceMappingURL=loader-base.js.map
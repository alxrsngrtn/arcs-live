import { ParticleExecutionContext } from '../runtime/particle-execution-context.js';
import { ParticleSpec } from '../runtime/particle-spec.js';
import { Particle } from '../runtime/particle.js';
declare type ParticleCtor = typeof Particle;
interface UrlMap {
    [macro: string]: string | {
        root: string;
        path?: string;
        buildDir: string;
        buildOutputRegex: RegExp;
    };
}
/**
 * Key public API:
 *   async loadResource(file: string): Promise<string>
 *   async loadBinaryResource(file: string): Promise<ArrayBuffer>
 *   async loadParticleClass(spec: ParticleSpec): Promise<typeof Particle>
 */
export declare abstract class LoaderBase {
    pec?: ParticleExecutionContext;
    protected readonly urlMap: UrlMap;
    protected readonly staticMap: {};
    constructor(urlMap?: {}, staticMap?: {});
    setParticleExecutionContext(pec: ParticleExecutionContext): void;
    flushCaches(): void;
    loadResource(file: string): Promise<string>;
    loadBinaryResource(file: string): Promise<ArrayBuffer>;
    protected loadStatic(path: string): string;
    protected loadStaticBinary(path: string): ArrayBuffer;
    protected loadUrl(url: string): Promise<string>;
    protected fetchString(url: string): Promise<string>;
    protected loadBinaryUrl(url: string): Promise<ArrayBuffer>;
    protected fetchBuffer(url: string): Promise<ArrayBuffer>;
    /**
     * Abstract: platforms access the filesystem differently.
     */
    protected abstract loadFile(url: string): Promise<string>;
    protected abstract loadBinaryFile(url: string): Promise<ArrayBuffer>;
    join(prefix: string, path: string): string;
    path(fileName: string): string;
    protected normalizeDots(path: string): string;
    resolve(path: string): string;
    private resolvePath;
    private findUrlMapMacro;
    private resolveConfiguredPath;
    protected mapParticleUrl(path: string): any;
    private loadSchemaOrgUrl;
    provisionObjectUrl(fileName: string): Promise<any>;
    /**
     * Returns a particle class implementation by loading and executing
     * the code defined by a particle.  In the following example `x.js`
     * will be loaded and executed:
     *
     * ```
     * Particle foo in 'x.js'
     * ```
     */
    loadParticleClass(spec: ParticleSpec): Promise<ParticleCtor>;
    /**
     * Loads a particle class from the given filename by loading the
     * script contained in `fileName` and executing it as a script.
     *
     * Protected for use in tests.
     *
     * Abstract because different platforms marshal particle execution contexts differently.
     */
    protected abstract requireParticle(fileName: string, blobUrl?: string): Promise<ParticleCtor>;
    /**
     * executes the defineParticle() code and returns the results which should be a class definition.
     */
    protected unwrapParticle(particleWrapper: any, log?: any): any;
    protected provisionLogger(fileName: string): Function;
}
export {};

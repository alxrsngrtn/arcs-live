import { ParticleExecutionContext } from './particle-execution-context.js';
import { ParticleSpec } from './particle-spec.js';
import { Particle } from './particle.js';
export declare class Loader {
    pec?: ParticleExecutionContext;
    path(fileName: string): string;
    join(prefix: string, path: string): string;
    normalizeDots(path: string): string;
    loadResource(file: string): Promise<string>;
    loadBinary(file: string): Promise<ArrayBuffer>;
    private loadFile;
    _loadURL(url: string): Promise<string>;
    /**
     * Returns a particle class implementation by loading and executing
     * the code defined by a particle.  In the following example `x.js`
     * will be loaded and executed:
     *
     * ```
     * Particle foo in 'x.js'
     * ```
     */
    loadParticleClass(spec: ParticleSpec): Promise<typeof Particle>;
    /**
     * Loads a particle class from the given filename by loading the
     * script contained in `fileName` and executing it as a script.
     *
     * Protected for use in tests.
     */
    protected requireParticle(fileName: string): Promise<typeof Particle>;
    setParticleExecutionContext(pec: ParticleExecutionContext): void;
    /**
     * executes the defineParticle() code and returns the results which should be a class definition.
     */
    unwrapParticle(particleWrapper: any): typeof Particle;
}

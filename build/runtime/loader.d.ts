import { ParticleExecutionContext } from './particle-execution-context.js';
export declare class Loader {
    pec?: ParticleExecutionContext;
    path(fileName: string): string;
    join(prefix: string, path: string): string;
    normalizeDots(path: string): string;
    loadResource(file: string): Promise<string>;
    _loadFile(file: string): Promise<string>;
    _loadURL(url: string): Promise<string>;
    loadParticleClass(spec: any): Promise<any>;
    requireParticle(fileName: string): Promise<any>;
    setParticleExecutionContext(pec: ParticleExecutionContext): void;
    unwrapParticle(particleWrapper: any): any;
}

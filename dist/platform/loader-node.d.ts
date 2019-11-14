import { Particle } from '../runtime/particle.js';
import { LoaderBase } from './loader-base.js';
export declare class Loader extends LoaderBase {
    clone(): Loader;
    loadFile(path: string): Promise<string>;
    loadBinaryFile(path: string): Promise<ArrayBuffer>;
    private loadFileData;
    requireParticle(fileName: string, blobUrl?: string): Promise<typeof Particle>;
}

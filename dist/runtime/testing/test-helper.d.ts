/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from '../arc.js';
import { Loader } from '../loader.js';
import { Manifest } from '../manifest.js';
import { MockSlotComposer } from '../testing/mock-slot-composer.js';
export declare type TestHelperOptions = {
    slotComposerStrict?: boolean;
    slotComposer?: MockSlotComposer;
    logging?: boolean;
    loader?: Loader;
    context?: Manifest;
    manifestFilename?: string;
    manifestString?: string;
    storageKey?: string;
};
export declare class TestHelper {
    logging?: boolean;
    loader?: Loader;
    timeout: any;
    arc: Arc;
    slotComposer: MockSlotComposer;
    static setupOptions(options: TestHelperOptions): Promise<void>;
    static setupHelper(options: TestHelperOptions, helper: TestHelper): void;
    /**
     * Initializes a single arc using a mock slot composer.
     * |options| may contain:
     *   - slotComposerStrict: whether mock slot composer will be executing in strict mode.
     *   - logging: whether to log execution progress (default: false).
     *   - loader: file loader to use.
     *   - context: Manifest object.
     *   - manifestFilename: filename of the manifest file to load as the context.
     *   - manifestString: a string with content of the manifest to load as the context.
     */
    static create(options?: TestHelperOptions): Promise<TestHelper>;
    static parseManifest(manifestString: string, loader: any): Promise<Manifest>;
    setTimeout(timeout: number): void;
    clearTimeout(): void;
    readonly envOptions: {
        context: Manifest;
        loader: Loader;
    };
    /**
     * Sends an event to particle's slot via the slot composer.
     */
    sendSlotEvent(particleName: string, slotName: any, event: any, data: any): Promise<void>;
    /**
     * Awaits particle execution context idleness and mock slot composer expectations completeness.
     */
    idle(): Promise<void>;
    /**
     * Verifies data in handle |connectionName| of |particleName| with the given handler.
     */
    verifyData(particleName: string, connectionName: string, expectationHandler: any): Promise<{}>;
    /**
     * Verifies the size of data collection in handle |connectionName| of |particleName|.
     */
    verifySetSize(particleName: string, connectionName: string, expectedSetSize: number): Promise<{}>;
    verifySlots(numConsumers: number, verifyHandler: any): void;
    log(message: any): void;
}

/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export declare function typeSummary(descriptor: any): any;
export declare class Schema2Base {
    private desc;
    private fileNamer;
    private generate;
    constructor(description: string, fileNamer: (schemaName: string) => string, generator: (name: string, schema: any) => string);
    processFile(file: string, outputPrefix?: string): Promise<void>;
    readonly scriptName: string;
    call(): void;
}

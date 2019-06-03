/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export declare const jsonrpc = "2.0";
export interface AmlServiceOptions {
    log: string;
    port: number;
    help: boolean;
    version: boolean;
    stdio: boolean;
}
export interface AmlServiceContext {
    logger: Logger;
    rootPath?: string;
    options: AmlServiceOptions;
}
export interface Logger {
    log(...values: any[]): void;
    info(...values: any[]): void;
    warn(...values: any[]): void;
    error(...values: any[]): void;
}
export declare class DevNullLogger implements Logger {
    log(..._values: any[]): void;
    info(..._values: any[]): void;
    warn(..._values: any[]): void;
    error(..._values: any[]): void;
}
export declare function normalizeUri(uri: string): string;
export declare function uri2path(uri: string): string | undefined;
export declare function camelCase(str: string): string;

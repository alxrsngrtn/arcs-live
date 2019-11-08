/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { StorageKey } from './storage-key.js';
declare type ParserTopLevel = (key: string) => StorageKey;
declare type Parser = (key: string, parse: ParserTopLevel) => StorageKey;
/**
 * Parses storage key string representations back into real StorageKey
 * instances.
 *
 * Singleton class with static methods. If you modify the default set of storage
 * keys in a test, remember to call StorageKeyParser.reset() in the tear-down
 * method.
 */
export declare class StorageKeyParser {
    private static parsers;
    private static getDefaultParsers;
    static parse(key: string): StorageKey;
    static reset(): void;
    static addParser(protocol: string, parser: Parser): void;
}
export {};

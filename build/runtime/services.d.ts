/**
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Dictionary } from './hot.js';
export interface Service {
    [name: string]: Function;
}
declare type Registry = Dictionary<Service>;
export interface ServiceRequest {
    service?: string;
    invoke?: string;
    call?: string;
}
export declare class Services {
    static registry: Registry;
    static register(name: string, service: Service): void;
    static request(request: ServiceRequest): Promise<any>;
}
export {};

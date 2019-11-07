/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { NextFunction, Request, Response } from 'express';
import { AppBase } from './app-base';
/**
 * A server for managing a collection of pouchdbapp VMs, including creating and deploying new ones,
 * locating existing deployments, and shutting down existing deployments.
 */
declare class ArcsMasterApp extends AppBase {
    constructor();
    protected addRoutes(): void;
    /**
     * GCP doesn't allow uppercase, +,-, or = characters in labels, it also doesn't allow them to exceed 61 characters,
     * so we take a base64 fingerprint, remove illegal characters, and then shorten it to 32-characters.
     * @param str a base64 string, usually a fingerprint.
     */
    gcpSafeIdentifier(str: string): string;
    lock(req: Request, res: Response, next: NextFunction): Promise<void>;
    unlock(req: Request, res: Response, next: NextFunction): Promise<void>;
    findDeployment(req: Request, res: Response, next: NextFunction): Promise<void>;
    deploy(req: Request, res: Response, next: NextFunction): Promise<void>;
    mount(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const app: ArcsMasterApp;
export {};

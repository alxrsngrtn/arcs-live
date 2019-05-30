/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Runtime } from 'arcs';
import express from 'express';
/**
 * Centralized base class that configures and ExpressJS server.
 * Adds static content, and api methods for Arcs. See pouchdbapp and arcsmasterapp
 * for concrete examples.
 */
export declare abstract class AppBase {
    express: express.Application;
    runtime: Runtime;
    constructor();
    /**
     * Override this method to configure server specific routes.
     */
    protected addRoutes(): void;
    /** Configure Express middleware. */
    private middleware;
    /**
     * Override this method to execute code after the server starts listening.
     * Used to run background processes like Shell Planning.
     */
    startBackgroundProcessing(): void;
    /**
     * Adds handlers for static content.  The public directory is
     * checked first.  If not found then the legacy arcs directory is searched.
     */
    private addStaticRoutes;
    /**
     * Endpoints that end up mapped under /arcs are defined here.
     */
    private addArcsRoutes;
}

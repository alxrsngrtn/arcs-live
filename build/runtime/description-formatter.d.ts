/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from './arc.js';
import { Handle } from './recipe/handle.js';
import { Particle } from './recipe/particle.js';
import { HandleConnection } from './recipe/handle-connection.js';
import { StorageProviderBase } from './storage/storage-provider-base.js';
import { Relevance } from './relevance';
export declare type ParticleDescription = {
    _particle: Particle;
    pattern?: string;
    _connections: {
        [index: string]: HandleDescription;
    };
    _rank?: number;
};
export declare type HandleDescription = {
    pattern: string;
    _handleConn: HandleConnection;
    _store: StorageProviderBase;
};
export declare type CombinedDescriptionsOptions = {
    skipFormatting?: boolean;
};
export declare class DescriptionFormatter {
    private arc;
    private relevance;
    private particleDescriptions;
    private seenHandles;
    seenParticles: Set<Particle>;
    excludeValues: boolean;
    constructor(arc: Arc, relevance?: Relevance);
    getDescription(recipe: {
        patterns: string[];
        particles: Particle[];
    }): Promise<any>;
    _isSelectedDescription(desc: ParticleDescription): boolean;
    getHandleDescription(recipeHandle: Handle): Promise<any>;
    _updateDescriptionHandles(): Promise<void>;
    _createParticleDescription(particle: Particle): Promise<ParticleDescription>;
    _getPatternByNameFromDescriptionHandle(particle: any): Promise<{}>;
    _populateParticleDescription(particle: any, descriptionByName: any): {
        pattern: any;
    } | {
        pattern?: undefined;
    };
    _combineSelectedDescriptions(selectedDescriptions: ParticleDescription[], options?: CombinedDescriptionsOptions): Promise<any>;
    _joinDescriptions(strings: any): any;
    _joinTokens(tokens: any): any;
    _capitalizeAndPunctuate(sentence: any): string;
    patternToSuggestion(pattern: any, particleDescription: any): any;
    _initTokens(pattern: any, particleDescription: any): any[];
    _initSubTokens(pattern: any, particleDescription: any): {}[];
    tokenToString(token: any): any;
    _particleTokenToString(token: any): Promise<any>;
    _handleTokenToString(token: any): any;
    _combineDescriptionAndValue(token: any, description: any, storeValue: any): any;
    _slotTokenToString(token: any): Promise<any>;
    _propertyTokenToString(handleName: any, store: any, properties: any): Promise<any>;
    _formatEntityProperty(handleName: any, properties: any, value: any): any;
    _formatStoreValue(handleName: any, store: any): Promise<any>;
    _formatCollection(handleName: any, values: any): any;
    _formatBigCollection(handleName: any, firstValue: any): any;
    _formatSingleton(handleName: any, value: any, handleDescription: any): any;
    _formatDescription(handleConnection: any, store: any): any;
    _formatDescriptionPattern(handleConnection: any): any;
    _formatStoreDescription(handleConn: any, store: any): any;
    _formatHandleType(handleConnection: any): any;
    _selectHandleConnection(recipeHandle: any): any;
    static sort(p1: any, p2: any): number;
}

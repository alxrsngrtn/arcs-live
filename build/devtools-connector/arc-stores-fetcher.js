/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export class ArcStoresFetcher {
    constructor(arc, arcDevtoolsChannel) {
        this.watchedHandles = new Set();
        this.arc = arc;
        this.arcDevtoolsChannel = arcDevtoolsChannel;
        arcDevtoolsChannel.listen('fetch-stores', async () => arcDevtoolsChannel.send({
            messageType: 'fetch-stores-result',
            messageBody: await this.listStores()
        }));
    }
    onRecipeInstantiated() {
        for (const store of this.arc._stores) {
            if (!this.watchedHandles.has(store.id)) {
                this.watchedHandles.add(store.id);
                store.on(async () => this.arcDevtoolsChannel.send({
                    messageType: 'store-value-changed',
                    messageBody: {
                        id: store.id.toString(),
                        value: await this.dereference(store)
                    }
                }));
            }
        }
    }
    async listStores() {
        const find = (manifest) => {
            let tags = [...manifest.storeTags];
            if (manifest.imports) {
                manifest.imports.forEach(imp => tags = tags.concat(find(imp)));
            }
            return tags;
        };
        return {
            arcStores: await this.digestStores([...this.arc.storeTags]),
            contextStores: await this.digestStores(find(this.arc.context))
        };
    }
    async digestStores(stores) {
        const result = [];
        for (const [store, tags] of stores) {
            result.push({
                name: store.name,
                tags: tags ? [...tags] : [],
                id: store.id,
                storage: store.storageKey,
                type: store.type,
                description: store.description,
                value: await this.dereference(store)
            });
        }
        return result;
    }
    // tslint:disable-next-line: no-any
    async dereference(store) {
        if (store.toList) {
            return store.toList();
        }
        else if (store.get) {
            return store.get();
        }
        else {
            return `(don't know how to dereference)`;
        }
    }
}
//# sourceMappingURL=arc-stores-fetcher.js.map
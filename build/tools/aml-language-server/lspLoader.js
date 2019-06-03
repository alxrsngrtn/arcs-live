/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import fs from 'fs';
import path from 'path';
export class LspLoader {
    constructor(context) {
        this.context = context;
    }
    path(fileName) {
        return fileName.replace(/[/][^/]+$/, '/');
    }
    join(prefix, filepath) {
        if (/^https?:\/\//.test(filepath)) {
            return filepath;
        }
        // TODO: replace this with something that isn't hacky
        if (filepath[0] === '/' || filepath[1] === ':') {
            return filepath;
        }
        return path.join(path.normalize(prefix), filepath);
    }
    async loadResource(fileName) {
        return new Promise((resolve, reject) => {
            fs.readFile(fileName, { encoding: 'utf-8' }, (err, data) => {
                this.context.logger.info(`Finished reading file ${fileName}`);
                if (err || !data) {
                    this.context.logger.error(`Error reading file ${fileName}`);
                    reject(err);
                }
                this.context.logger.info(`Success reading file ${fileName}`);
                resolve(data);
            });
        });
    }
}
//# sourceMappingURL=lspLoader.js.map
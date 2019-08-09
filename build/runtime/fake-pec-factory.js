/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { MessageChannel } from './message-channel.js';
import { ParticleExecutionContext } from './particle-execution-context.js';
// TODO: Make this generic so that it can also be used in-browser, or add a
// separate in-process browser pec-factory.
export function FakePecFactory(loader) {
    return (pecId, idGenerator) => {
        const channel = new MessageChannel();
        // Each PEC should get its own loader.
        const pec = new ParticleExecutionContext(channel.port1, pecId, idGenerator, loader.clone());
        return channel.port2;
    };
}
//# sourceMappingURL=fake-pec-factory.js.map
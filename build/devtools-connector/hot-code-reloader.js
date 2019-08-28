/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Listens to particle reload events for all particles instantiated in an arc and reloads the particles
 * when their source files change
 */
export class HotCodeReloader {
    constructor(arc, arcDevtoolsChannel) {
        this.arc = arc;
        arcDevtoolsChannel.listen('particle-reload', (msg) => void this._reload(msg.messageBody));
    }
    _reload(filepath) {
        const arcs = [this.arc];
        arcs.push(...this.arc.innerArcs);
        for (const arc of arcs) {
            const particles = [];
            for (const particle of arc.pec.particles) {
                if (particle.spec.implFile === filepath) {
                    particles.push(particle);
                }
            }
            arc.pec.reload(particles);
        }
    }
}
//# sourceMappingURL=hot-code-reloader.js.map
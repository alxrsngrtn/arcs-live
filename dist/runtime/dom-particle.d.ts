import { DomParticleBase } from './dom-particle-base.js';
interface StatefulDomParticle extends DomParticleBase {
    _invalidate(): void;
}
export interface DomParticle extends StatefulDomParticle {
}
declare const DomParticle_base: any;
/** @class DomParticle
 * Particle that interoperates with DOM and uses a simple state system
 * to handle updates.
 */
export declare class DomParticle extends DomParticle_base {
    constructor();
    /** @method willReceiveProps(props, state, oldProps, oldState)
     * Override if necessary, to do things when props change.
     */
    willReceiveProps(...args: any[]): void;
    /** @method update(props, state, oldProps, oldState)
     * Override if necessary, to modify superclass config.
     */
    update(...args: any[]): void;
    /** @method shouldRender(props, state, oldProps, oldState)
     * Override to return false if the Particle won't use
     * it's slot.
     */
    shouldRender(...args: any[]): boolean;
    /** @method render(props, state, oldProps, oldState)
     * Override to return a dictionary to map into the template.
     */
    render(...args: any[]): {};
    /** @method setState(state)
     * Copy values from `state` into the particle's internal state,
     * triggering an update cycle unless currently updating.
     */
    setState(state: any): any;
    /** @method configureHandles(handles)
     * This is called once during particle setup. Override to control sync and update
     * configuration on specific handles (via their configure() method).
     * `handles` is a map from names to handle instances.
     */
    configureHandles(handles: any): void;
    /** @method get config()
     * Override if necessary, to modify superclass config.
     */
    readonly config: {
        handleNames: string[];
        slotNames: string[];
    };
    _willReceiveProps(...args: any[]): void;
    _update(...args: any[]): void;
    readonly _views: Map<string, import("./handle.js").Handle>;
    setViews(views: any): Promise<void>;
    setHandles(handles: any): Promise<void>;
    onHandleSync(handle: any, model: any): Promise<void>;
    onHandleUpdate(handle: any, update: any): Promise<void>;
    _handlesToProps(): Promise<void>;
    _addNamedHandleData(dictionary: any, handleName: any): Promise<void>;
    _getHandleData(handle: any): Promise<any>;
    fireEvent(slotName: string, { handler, data }: {
        handler: any;
        data: any;
    }): void;
    _debounce(key: string, func: Function, delay: number): void;
}
export {};

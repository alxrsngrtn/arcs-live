import { Consumer, Literal } from './hot.js';
export interface SerializedPropagatedException extends Literal {
    exceptionType: string;
    cause: {
        name: string;
        message: string;
        stack: string;
    };
    method: string;
    particleId: string;
    particleName?: string;
    stack?: string;
}
/** An exception that is to be propagated back to the host. */
export declare class PropagatedException extends Error {
    cause: Error;
    method: string;
    particleId: string;
    particleName?: string;
    constructor(cause: Error, method: string, particleId: string, particleName?: string);
    toLiteral(): SerializedPropagatedException;
    static fromLiteral(literal: SerializedPropagatedException): PropagatedException;
}
/** An exception thrown in Arcs runtime code. */
export declare class SystemException extends PropagatedException {
    readonly message: string;
}
/** An exception thrown in the user particle code (as opposed to an error in the Arcs runtime). */
export declare class UserException extends PropagatedException {
    readonly message: string;
}
declare type ExceptionHandler = Consumer<PropagatedException>;
export declare function reportSystemException(exception: PropagatedException): void;
export declare function registerSystemExceptionHandler(handler: ExceptionHandler): void;
export declare function removeSystemExceptionHandler(handler: ExceptionHandler): void;
export {};

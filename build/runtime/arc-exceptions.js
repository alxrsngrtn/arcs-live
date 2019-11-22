/** An exception that is to be propagated back to the host. */
export class PropagatedException extends Error {
    constructor(cause, method, particleId, particleName) {
        super();
        this.cause = cause;
        this.method = method;
        this.particleId = particleId;
        this.particleName = particleName;
        this.stack += `\nCaused by: ${this.cause.stack}`;
    }
    toLiteral() {
        return {
            exceptionType: this.constructor.name,
            cause: {
                name: this.cause.name,
                message: this.cause.message,
                stack: this.cause.stack,
            },
            method: this.method,
            particleId: this.particleId,
            particleName: this.particleName,
            stack: this.stack,
        };
    }
    static fromLiteral(literal) {
        const cause = literal.cause;
        let exception;
        switch (literal.exceptionType) {
            case SystemException.name:
                exception = new SystemException(cause, literal.method, literal.particleId, literal.particleName);
                break;
            case UserException.name:
                exception = new UserException(cause, literal.method, literal.particleId, literal.particleName);
                break;
            default:
                throw new Error(`Unknown exception type: ${literal.exceptionType}`);
        }
        exception.stack = literal.stack;
        return exception;
    }
}
/** An exception thrown in Arcs runtime code. */
export class SystemException extends PropagatedException {
    get message() {
        const particleName = this.particleName ? this.particleName : this.particleId;
        return `SystemException: exception ${this.cause.name} raised when invoking system function ${this.method} on behalf of particle ${particleName}: ${this.cause.message}`;
    }
}
/** An exception thrown in the user particle code (as opposed to an error in the Arcs runtime). */
export class UserException extends PropagatedException {
    get message() {
        const particleName = this.particleName ? this.particleName : this.particleId;
        return `UserException: exception ${this.cause.name} raised when invoking function ${this.method} on particle ${particleName}: ${this.cause.message}`;
    }
}
const systemHandlers = [];
export function reportSystemException(exception) {
    for (const handler of systemHandlers) {
        handler(exception);
    }
}
export function registerSystemExceptionHandler(handler) {
    if (!systemHandlers.includes(handler)) {
        systemHandlers.push(handler);
    }
}
export function removeSystemExceptionHandler(handler) {
    const idx = systemHandlers.indexOf(handler);
    if (idx > -1) {
        systemHandlers.splice(idx, 1);
    }
}
registerSystemExceptionHandler((exception) => {
    console.log(exception.method, exception.particleName);
    throw exception;
});
//# sourceMappingURL=arc-exceptions.js.map
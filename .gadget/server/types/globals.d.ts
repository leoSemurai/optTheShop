/// <reference types="node" />
/// <reference types="node" />
import type { RequestContext } from "@fastify/request-context";
import { AsyncLocalStorage } from "async_hooks";
import type { Logger } from "./AmbientContext";
import type { AnyActionContext, AnyAmbientContext, AnyEffectContext, AnyGlobalActionContext } from "./types";
export declare const actionContextLocalStorage: AsyncLocalStorage<AnyEffectContext | AnyActionContext | AnyGlobalActionContext>;
/**
 * Extend the @fastify/request-context types with Gadget's added reference to the current unit of work's context
 * See https://github.com/fastify/fastify-request-context#typescript
 * */
declare module "@fastify/request-context" {
    interface RequestContextData {
        requestContext: AnyAmbientContext | AnyActionContext | AnyGlobalActionContext | AnyEffectContext;
    }
}
export declare const Globals: {
    /**
     * Internal variable to store the model validator function, set in `set` by the `AppBridge`.
     * @internal
     */
    modelValidator: (modelKey: string) => Promise<any>;
    /**
     * Internal variable to store the request context module, set in `set` by the `AppBridge`.
     * @internal
     */
    requestContext: RequestContext;
    /**
     * @internal
     */
    logger: import("fastify").FastifyBaseLogger;
    /**
     * Require function for importing code from the gadget platform context instead of the app's context.
     * @internal
     */
    platformRequire: NodeRequire;
    /**
     * This is used internally to set the globals for this instance of the framework package.
     * @internal
     */
    set(globals: {
        logger: Logger;
        modelValidator: (modelKey: string) => Promise<any>;
        requestContext: RequestContext;
        platformRequire: typeof require;
    }): void;
    /**
     * Lazy-loaded modules for use in the framework package from the gadget platform context.
     * @internal
     */
    platformModules: {
        lodash: () => any;
        bcrypt: () => any;
        compareVersions: () => any;
    };
};

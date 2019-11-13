/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { ChangeType, CRDTError } from '../crdt/crdt.js';
import { DriverFactory } from './drivers/driver-factory.js';
import { ActiveStore, ProxyMessageType } from './store-interface.js';
import { noAwait } from '../util.js';
export var DirectStoreState;
(function (DirectStoreState) {
    DirectStoreState["Idle"] = "Idle";
    DirectStoreState["AwaitingResponse"] = "AwaitingResponse";
    DirectStoreState["AwaitingResponseDirty"] = "AwaitingResponseDirty";
    DirectStoreState["AwaitingDriverModel"] = "AwaitingDriverModel";
})(DirectStoreState || (DirectStoreState = {}));
export class DirectStore extends ActiveStore {
    /*
     * This class should only ever be constructed via the static construct method
     */
    constructor(options) {
        super(options);
        this.callbacks = new Map();
        this.nextCallbackID = 1;
        this.version = 0;
        this.pendingException = null;
        this.pendingResolves = [];
        this.pendingRejects = [];
        this.pendingDriverModels = [];
        this.state = DirectStoreState.Idle;
    }
    async serializeContents() {
        await this.idle();
        return this.localModel.getData();
    }
    async idle() {
        if (this.pendingException) {
            return Promise.reject(this.pendingException);
        }
        if (this.state === DirectStoreState.Idle) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            this.pendingResolves.push(resolve);
            this.pendingRejects.push(reject);
        });
    }
    get versionToken() {
        return this.driver.getToken();
    }
    setState(state) {
        this.state = state;
        if (state === DirectStoreState.Idle) {
            // If we are already idle, this won't notify external parties.
            this.notifyIdle();
        }
    }
    notifyIdle() {
        if (this.pendingException) {
            // this is termination.
            this.pendingRejects.forEach(reject => reject(this.pendingException));
        }
        else {
            this.pendingResolves.forEach(resolve => resolve());
            this.pendingResolves = [];
        }
    }
    static async construct(options) {
        const me = new DirectStore(options);
        me.localModel = new (options.type.crdtInstanceConstructor())();
        me.driver = await DriverFactory.driverInstance(options.storageKey, options.exists);
        if (me.driver == null) {
            throw new CRDTError(`No driver exists to support storage key ${options.storageKey}`);
        }
        me.driver.registerReceiver(me.onReceive.bind(me), options.versionToken);
        return me;
    }
    // The driver will invoke this method when it has an updated remote model
    async onReceive(model, version) {
        this.pendingDriverModels.push({ model, version });
        if (this.state === DirectStoreState.AwaitingResponse || this.state === DirectStoreState.AwaitingResponseDirty) {
            return;
        }
        this.applyPendingDriverModels();
    }
    deliverCallbacks(thisChange, messageFromDriver, channel) {
        if (thisChange.changeType === ChangeType.Operations && thisChange.operations.length > 0) {
            this.callbacks.forEach((cb, id) => {
                if (messageFromDriver || channel !== id) {
                    void cb({ type: ProxyMessageType.Operations, operations: thisChange.operations, id });
                }
            });
        }
        else if (thisChange.changeType === ChangeType.Model) {
            this.callbacks.forEach((cb, id) => {
                if (messageFromDriver || channel !== id) {
                    void cb({ type: ProxyMessageType.ModelUpdate, model: thisChange.modelPostChange, id });
                }
            });
        }
    }
    async processModelChange(modelChange, otherChange, version, channel) {
        this.deliverCallbacks(modelChange, /* messageFromDriver= */ false, channel);
        await this.updateStateAndAct(this.noDriverSideChanges(modelChange, otherChange, false), version, false);
    }
    // This function implements a state machine that controls when data is sent to the driver.
    // You can see the state machine in all its glory at the following URL:
    //
    // https://github.com/PolymerLabs/arcs/wiki/Store-object-State-Machine
    //
    async updateStateAndAct(noDriverSideChanges, version, messageFromDriver) {
        // Don't send to the driver if we're already in sync and there are no driver-side changes.
        if (noDriverSideChanges) {
            // Need to record the driver version so that we can continue to send.
            this.setState(DirectStoreState.Idle);
            this.version = version;
            return;
        }
        switch (this.state) {
            case DirectStoreState.AwaitingDriverModel:
                if (!messageFromDriver) {
                    return;
                }
            /* falls through */
            case DirectStoreState.Idle:
                // This loop implements sending -> AwaitingResponse -> AwaitingResponseDirty -> sending.
                // Breakouts happen if:
                //  (1) a response arrives while still AwaitingResponse. This returns the store to Idle.
                //  (2) a negative response arrives. This means we're now waiting for driver models
                //      (AwaitingDriverModel). Note that in this case we are likely to end up back in
                //      this loop when a driver model arrives.
                while (true) {
                    this.setState(DirectStoreState.AwaitingResponse);
                    // Work around a typescript compiler bug. Apparently typescript won't guarantee that
                    // a Map key you've just set will exist, but is happy to assure you that a private
                    // member variable couldn't possibly change in any function outside the local scope
                    // when within a switch statement.
                    this.state = DirectStoreState.AwaitingResponse;
                    this.version = ++version;
                    const response = await this.driver.send(this.localModel.getData(), version);
                    if (response) {
                        if (this.state === DirectStoreState.AwaitingResponse) {
                            this.setState(DirectStoreState.Idle);
                            this.applyPendingDriverModels();
                            break;
                        }
                        if (this.state !== DirectStoreState.AwaitingResponseDirty) {
                            // This shouldn't be possible as only a 'nack' should put us into
                            // AwaitingDriverModel, and only the above code should put us back
                            // into Idle.
                            throw new Error('reached impossible state in store state machine');
                        }
                        // fallthrough to re-execute the loop.
                    }
                    else {
                        this.setState(DirectStoreState.AwaitingDriverModel);
                        this.applyPendingDriverModels();
                        break;
                    }
                }
                return;
            case DirectStoreState.AwaitingResponse:
                this.setState(DirectStoreState.AwaitingResponseDirty);
                return;
            case DirectStoreState.AwaitingResponseDirty:
                return;
            default:
                throw new Error('reached impossible default state in switch statement');
        }
    }
    applyPendingDriverModels() {
        if (this.pendingDriverModels.length > 0) {
            const models = this.pendingDriverModels;
            this.pendingDriverModels = [];
            let noDriverSideChanges = true;
            let theVersion = 0;
            for (const { model, version } of models) {
                try {
                    const { modelChange, otherChange } = this.localModel.merge(model);
                    this.deliverCallbacks(modelChange, /* messageFromDriver= */ true, 0);
                    noDriverSideChanges = noDriverSideChanges && this.noDriverSideChanges(modelChange, otherChange, true);
                    theVersion = version;
                }
                catch (e) {
                    this.pendingException = e;
                    this.notifyIdle();
                    return;
                }
            }
            void this.updateStateAndAct(noDriverSideChanges, theVersion, true);
        }
    }
    // Note that driver-side changes are stored in 'otherChange' when the merged operations/model is sent
    // from the driver, and 'thisChange' when the merged operations/model is sent from a storageProxy.
    // In the former case, we want to look at what has changed between what the driver sent us and what
    // we now have. In the latter, the driver is only as up-to-date as our local model before we've
    // applied the operations.
    noDriverSideChanges(thisChange, otherChange, messageFromDriver) {
        if (messageFromDriver) {
            return otherChange.changeType === ChangeType.Operations && otherChange.operations.length === 0;
        }
        else {
            return thisChange.changeType === ChangeType.Operations && thisChange.operations.length === 0;
        }
    }
    // Operation or model updates from connected StorageProxies will arrive here.
    // Additionally, StorageProxy objects may request a SyncRequest, which will
    // result in an up-to-date model being sent back to that StorageProxy.
    // a return value of true implies that the message was accepted, a
    // return value of false requires that the proxy send a model sync
    async onProxyMessage(message) {
        if (this.pendingException) {
            throw this.pendingException;
        }
        switch (message.type) {
            case ProxyMessageType.SyncRequest:
                await this.callbacks.get(message.id)({ type: ProxyMessageType.ModelUpdate, model: this.localModel.getData(), id: message.id });
                return true;
            case ProxyMessageType.Operations: {
                for (const operation of message.operations) {
                    if (!this.localModel.applyOperation(operation)) {
                        await this.callbacks.get(message.id)({ type: ProxyMessageType.SyncRequest, id: message.id });
                        return false;
                    }
                }
                const change = { changeType: ChangeType.Operations, operations: message.operations };
                // to make tsetse checks happy
                noAwait(this.processModelChange(change, null, this.version, message.id));
                return true;
            }
            case ProxyMessageType.ModelUpdate: {
                const { modelChange, otherChange } = this.localModel.merge(message.model);
                // to make tsetse checks happy
                noAwait(this.processModelChange(modelChange, otherChange, this.version, message.id));
                return true;
            }
            default:
                throw new CRDTError('Invalid operation provided to onProxyMessage');
        }
    }
    on(callback) {
        const id = this.nextCallbackID++;
        this.callbacks.set(id, callback);
        return id;
    }
    off(callback) {
        this.callbacks.delete(callback);
    }
    reportExceptionInHost(exception) {
        this.pendingException = exception;
        this.notifyIdle();
    }
}
//# sourceMappingURL=direct-store.js.map
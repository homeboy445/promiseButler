import { IPromiseManager } from "promise-manager";
/**
 * This mode will execute promise in a concurrent manner using the concepts of slots where whenever a slot
 * is empty, we'll assign the promise to it, so that whenever a resource is free, we can execute the promise there.
 */
export default class PipelinedFetch implements IPromiseManager {
    private requestSlots;
    private SLOT_SIZE;
    private requestCounter;
    private globalPromiseStore;
    private promiseRequestStore;
    debugMode: boolean;
    constructor({ debugMode, slotSize, }: {
        debugMode: boolean;
        slotSize?: number;
    });
    private log;
    executePromise(iterator: Generator<{
        promiseCallback: () => Promise<any>;
        index: number;
    }, void, unknown>, slotIdx: number): Promise<void>;
    dispatch(promiseCallbacks: Array<() => Promise<any>>): Promise<Array<any>>;
}

import { IPromiseManager } from "promise-manager";
export default class BatchedFetch implements IPromiseManager {
    private requestsArr;
    private globalPromiseStore;
    private BATCH_SIZE;
    private batchWiseCallback;
    private promiseResolvedStore;
    debugMode: boolean;
    constructor({ batchSize, debugMode, batchWiseCallback, }: {
        batchSize?: number;
        debugMode?: boolean;
        batchWiseCallback: (...args: any[]) => void;
    });
    private log;
    private processPromise;
    dispatch(promises: Array<() => Promise<any>>): Promise<Array<any>>;
}

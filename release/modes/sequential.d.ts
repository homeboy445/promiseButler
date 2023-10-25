import { IPromiseManager } from "promise-manager";
export default class SequentialFetch implements IPromiseManager {
    private requestPromise;
    debugMode: boolean;
    constructor({ debugMode }: {
        debugMode?: boolean;
    });
    private log;
    dispatch(promises: Array<() => Promise<any>>): Promise<any>;
}

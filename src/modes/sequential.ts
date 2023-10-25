import { IPromiseManager } from "promise-manager";

export default class SequentialFetch implements IPromiseManager {
    private requestPromise = Promise.resolve();
    debugMode = false;

    constructor({ debugMode }: { debugMode?: boolean }) {
        this.debugMode = this.debugMode ?? debugMode;
    }

    private log(...args: any[]) {
        if (this.debugMode) {
            console.log(...args);
        }
    }

    // will work just like promise.all!
    dispatch(promises: Array<() => Promise<any>>): Promise<any> {
        const promiseResults: { [idx: number]: Promise<any> } = {};
        const _this = this;
        return new Promise((resolve) => {
            promises.forEach((callback, idx) => {
                _this.requestPromise = _this.requestPromise.then(() => {
                    return callback().then((r) => {
                        _this.log("The promise of index: ", idx, " is successfull!");
                        promiseResults[idx] = r;
                    }).catch((e) => {
                        _this.log("The promise of index: ", idx, " is failed!");
                        promiseResults[idx] = e;
                    });
                });
            });
            _this.requestPromise = this.requestPromise.then(() => {
                _this.log("The promise is complete!");
                resolve(Object.values(promiseResults));
            });
        });
    }
}

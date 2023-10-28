export default class SequentialFetch {
    constructor({ debugMode }) {
        var _a;
        this.requestPromise = Promise.resolve();
        this.debugMode = false;
        this.debugMode = (_a = this.debugMode) !== null && _a !== void 0 ? _a : debugMode;
    }
    log(...args) {
        if (this.debugMode) {
            console.log(...args);
        }
    }
    // will work just like promise.all!
    dispatch(promises) {
        const promiseResults = {};
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

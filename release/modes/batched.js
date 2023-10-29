var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class BatchedFetch {
    constructor({ batchSize, debugMode, batchWiseCallback, }) {
        this.requestsArr = [];
        this.globalPromiseStore = {
            promise: Promise.resolve(),
            pending: false,
        };
        this.BATCH_SIZE = 6;
        this.batchWiseCallback = (...args) => { };
        this.promiseResolvedStore = { resolve: (idx) => { } };
        this.requestCounter = 0;
        this.debugMode = false;
        this.debugMode = debugMode !== null && debugMode !== void 0 ? debugMode : this.debugMode;
        this.BATCH_SIZE = batchSize !== null && batchSize !== void 0 ? batchSize : this.BATCH_SIZE;
        this.batchWiseCallback = batchWiseCallback !== null && batchWiseCallback !== void 0 ? batchWiseCallback : this.batchWiseCallback;
        this.log("Input params are: ", arguments);
    }
    log(...args) {
        if (this.debugMode) {
            console.log(...args);
        }
    }
    processPromise(callback, idx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.globalPromiseStore.pending) {
                yield this.globalPromiseStore.promise;
                return this.processPromise(callback, idx);
            }
            this.log("Adding the promise in the array! ", idx);
            this.requestsArr.push(callback()
                .then((r) => this.promiseResolvedStore[idx] = r)
                .catch((e) => (this.promiseResolvedStore[idx] = e))
                .then(() => { var _a, _b; return (_b = (_a = this.promiseResolvedStore) === null || _a === void 0 ? void 0 : _a.resolve) === null || _b === void 0 ? void 0 : _b.call(_a, idx); }));
            if (this.requestsArr.length == this.BATCH_SIZE) {
                this.globalPromiseStore = {
                    promise: Promise.all(this.requestsArr)
                        .catch((e) => {
                        this.log("There was an error while processing a batch: ", e);
                    })
                        .then(() => {
                        this.log("A batch got completed!");
                        this.batchWiseCallback(this.requestsArr);
                        this.requestsArr = [];
                        this.globalPromiseStore.pending = false;
                    }),
                    pending: true,
                };
            }
        });
    }
    dispatch(promises) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.promiseResolvedStore.resolve = (idx) => {
                    this.log("The promise at index", idx, " is complete!");
                    if (++this.requestCounter == promises.length) {
                        this.log("All of the promises are resolved!");
                        delete this.promiseResolvedStore.resolve;
                        resolve(Object.values(this.promiseResolvedStore));
                    }
                };
                for (let idx = 0; idx < promises.length; idx++) {
                    this.processPromise(promises[idx], idx);
                }
            });
        });
    }
}

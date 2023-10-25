import { IPromiseManager } from "../types";

export default class BatchedFetch implements IPromiseManager {
  private requestsArr: Array<Promise<any>> = [];
  private globalPromiseStore = {
    promise: Promise.resolve(),
    pending: false,
  };
  private BATCH_SIZE = 6;
  private batchWiseCallback = (...args: any[]) => {};
  private promiseResolvedStore: { [idx: number]: Promise<any>, resolve?: (idx: number) => void } = { resolve: (idx: number) => {} };
  debugMode = false;

  constructor({
    batchSize,
    debugMode,
    batchWiseCallback,
  }: {
    batchSize?: number;
    debugMode?: boolean;
    batchWiseCallback: (...args: any[]) => void;
  }) {
    this.debugMode = debugMode ?? this.debugMode;
    this.BATCH_SIZE = batchSize ?? this.BATCH_SIZE;
    this.batchWiseCallback = batchWiseCallback ?? this.batchWiseCallback;
    this.log("Input params are: ", arguments);
  }

  private log(...args: any[]) {
    if (this.debugMode) {
      console.log(...args);
    }
  }

  private async processPromise(
    callback: () => Promise<any>,
    idx: number
  ): Promise<any> {
    if (this.globalPromiseStore.pending) {
      await this.globalPromiseStore.promise;
      return this.processPromise(callback, idx);
    }
    this.log("Adding the promise in the array! ", idx)
    this.requestsArr.push(
      callback()
        .then((r) => {
          this.promiseResolvedStore[idx] = r;
          this.promiseResolvedStore?.resolve?.(idx);
        })
        .catch((e) => (this.promiseResolvedStore[idx] = e)
        )
    );
    if (this.requestsArr.length == this.BATCH_SIZE) {
      this.globalPromiseStore = {
        promise: Promise.all(this.requestsArr).then(() => {
          this.log("A batch got completed!");
          this.batchWiseCallback(this.requestsArr);
          this.requestsArr = [];
          this.globalPromiseStore.pending = false;
        }),
        pending: true,
      };
    }
  }

  async dispatch(promises: Array<() => Promise<any>>): Promise<Array<any>> {
    if (this.globalPromiseStore.pending) {
      await this.globalPromiseStore.promise;
    }
    return new Promise((resolve) => {
      this.promiseResolvedStore.resolve = (idx) => {
        this.log("The promise at index", idx, " is complete!");
        if (promises.length - 1 == idx) {
            this.log("All of the promises are resolved!");
            delete this.promiseResolvedStore.resolve;
            resolve(Object.values(this.promiseResolvedStore));
        }
      };
      promises.forEach(this.processPromise.bind(this));
    });
  }
}

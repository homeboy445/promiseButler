import { IPromiseManager } from "../types/promiseManager";

export default class BatchedFetch implements IPromiseManager {
  private requestsArr: Array<Promise<any>> = [];
  private globalPromiseStore = {
    promise: Promise.resolve(),
    pending: false,
  };
  private SLOT_SIZE = 6;
  private batchWiseCallback = (...args: any[]) => {};
  private promiseResolvedStore: { [idx: number]: Promise<any>, resolve: (idx: number) => void } = { resolve: (idx: number) => {} };
  debugMode = false;

  constructor({
    slotSize,
    debugMode,
    batchWiseCallback,
  }: {
    slotSize?: number;
    debugMode?: boolean;
    batchWiseCallback: (...args: any[]) => void;
  }) {
    this.debugMode = this.debugMode ?? debugMode;
    this.SLOT_SIZE = slotSize ?? this.SLOT_SIZE;
    this.batchWiseCallback = batchWiseCallback ?? this.batchWiseCallback;
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
    this.log("adding the promise in the array! ", idx);
    this.requestsArr.push(
      callback()
        .then((r) => (this.promiseResolvedStore[idx] = r))
        .catch((e) => (this.promiseResolvedStore[idx] = e)
        .finally(() => this.promiseResolvedStore.resolve(idx))
        )
    );
    if (this.requestsArr.length > this.SLOT_SIZE) {
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
            resolve(Object.values(this.promiseResolvedStore));
        }
      };
      promises.forEach(this.processPromise.bind(this));
    });
  }
}

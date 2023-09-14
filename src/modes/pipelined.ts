import { IPromiseManager } from "../types/promiseManager";

export default class PipelinedFetch implements IPromiseManager {
  private requestSlots: { [slotId: number]: Promise<any> } = {};
  private requestCounter = 0;
  private SLOT_SIZE: number = 6;
  private promiseCompleteCallback = (...args: any[]) => {};
  private promiseStore: { [idx: number]: Promise<any> } = {};
  debugMode = false;

  constructor({
    debugMode,
    slotSize,
    promiseCompleteCallback,
  }: {
    debugMode: boolean;
    slotSize?: number;
    promiseCompleteCallback: (...args: any[]) => void;
  }) {
    this.debugMode = debugMode ?? this.debugMode;
    this.SLOT_SIZE = slotSize ?? this.SLOT_SIZE;
    this.promiseCompleteCallback =
      promiseCompleteCallback ?? this.promiseCompleteCallback;
  }

  private log(...args: any[]) {
    if (this.debugMode) {
      console.log(...args);
    }
  }

  async dispatch(promises: Array<Promise<any>>): Promise<Array<any>> {
    return new Promise((resolve) => {
      for (let idx = 0; idx < promises.length; idx++) {
        const slotId = ++this.requestCounter % this.SLOT_SIZE;
        this.requestSlots[slotId] =
          this.requestSlots[slotId] || Promise.resolve();
        this.requestSlots[slotId].then(() => {
          return promises[idx]
            .then((r) => {
              this.promiseCompleteCallback(r);
              this.promiseStore[idx] = r;
            })
            .catch((e) => {
              this.promiseCompleteCallback(e);
              this.promiseStore[idx] = e;
            })
            .finally(() => {
              this.log("The promise at index:", idx, "is resolved!");
              if (promises.length - 1 == idx) {
                this.log("All of the promises are resolved now!");
                resolve(Object.values(this.promiseStore));
              }
            });
        });
      }
    });
  }
}

import { IPromiseManager, GenericObject } from "../../types/util";

/**
 * This mode will execute promise in a concurrent manner using the concepts of slots where whenever a slot
 * is empty, we'll assign the promise to it, so that whenever a resource is free, we can execute the promise there.
 */
export default class PipelinedFetch implements IPromiseManager {
  private requestSlots: { [slotId: number]: Promise<any> } = {};
  private SLOT_SIZE: number = 6;
  private requestCounter = 0;
  private globalPromiseStore: {
    resolve: (arg: any) => void;
    reject: () => void;
    resolvedPromises: GenericObject;
  } = { resolve: (arg) => {}, reject: () => {}, resolvedPromises: {} };
  private promiseRequestStore: { [identifier: string]: boolean } = {};
  debugMode = false;

  constructor({
    debugMode,
    slotSize,
  }: {
    debugMode: boolean;
    slotSize?: number;
  }) {
    this.debugMode = debugMode ?? this.debugMode;
    this.SLOT_SIZE = slotSize ?? this.SLOT_SIZE;
  }

  private log(...args: any[]) {
    if (this.debugMode) {
      console.log(...args);
    }
  }

  // Make this in a way, in which whenever any slot gets free, the next promise callback can be called!

  async executePromise(
    iterator: Generator<
      { promiseCallback: () => Promise<any>; index: number },
      void,
      unknown
    >,
    slotIdx: number
  ) {
    const { value, done } = iterator.next();
    if (done || !value) {
      return Promise.resolve();
    }
    const { promiseCallback, index } = value;
    const identifier = `${slotIdx}.${++this.requestCounter}`;
    this.promiseRequestStore[identifier] = false;
    this.log(
      "Assigning the promise callback at index: ",
      index,
      ", to slot: ",
      slotIdx
    );
    return this.requestSlots[slotIdx]
      .then(() => {
        const outcome = promiseCallback();
        this.log("Outcome of the promise of index: ", index, " ", outcome);
        return outcome;
      })
      .catch((e) => {
        this.log("promise failed in slot: ", slotIdx);
        return e;
      })
      .then(async (promiseResult) => {
        this.log("promise at index: ", index, " is complete!");
        delete this.promiseRequestStore[identifier];
        this.globalPromiseStore.resolvedPromises[index] = promiseResult;
        await this.executePromise(iterator, slotIdx);
        if (Object.keys(this.promiseRequestStore).length === 0) {
          this.globalPromiseStore.resolve(
            Object.values(this.globalPromiseStore.resolvedPromises)
          );
          this.promiseRequestStore = { done: true };
        }
      });
  }

  async dispatch(
    promiseCallbacks: Array<() => Promise<any>>
  ): Promise<Array<any>> {
    function* getCallback() {
      for (let idx = 0; idx < promiseCallbacks.length; idx++) {
        yield { promiseCallback: promiseCallbacks[idx], index: idx };
      }
    }
    return new Promise((resolve, reject) => {
      const it = getCallback();
      this.globalPromiseStore = { resolve, reject, resolvedPromises: {} };
      for (let slotId = 0; slotId < this.SLOT_SIZE; slotId++) {
        this.requestSlots[slotId] = Promise.resolve();
        this.executePromise(it, slotId);``
      }
    });
  }
}

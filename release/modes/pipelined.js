var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * This mode will execute promise in a concurrent manner using the concepts of slots where whenever a slot
 * is empty, we'll assign the promise to it, so that whenever a resource is free, we can execute the promise there.
 */
export default class PipelinedFetch {
    constructor({ debugMode, slotSize, }) {
        this.requestSlots = {};
        this.SLOT_SIZE = 6;
        this.requestCounter = 0;
        this.globalPromiseStore = { resolve: (arg) => { }, reject: () => { }, resolvedPromises: {} };
        this.promiseRequestStore = {};
        this.debugMode = false;
        this.debugMode = debugMode !== null && debugMode !== void 0 ? debugMode : this.debugMode;
        this.SLOT_SIZE = slotSize !== null && slotSize !== void 0 ? slotSize : this.SLOT_SIZE;
    }
    log(...args) {
        if (this.debugMode) {
            console.log(...args);
        }
    }
    // Make this in a way, in which whenever any slot gets free, the next promise callback can be called!
    executePromise(iterator, slotIdx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value, done } = iterator.next();
            if (done || !value) {
                return Promise.resolve();
            }
            const { promiseCallback, index } = value;
            const identifier = `${slotIdx}.${++this.requestCounter}`;
            this.promiseRequestStore[identifier] = false;
            this.log("Assigning the promise callback at index: ", index, ", to slot: ", slotIdx);
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
                .then((promiseResult) => __awaiter(this, void 0, void 0, function* () {
                this.log("promise at index: ", index, " is complete!");
                delete this.promiseRequestStore[identifier];
                this.globalPromiseStore.resolvedPromises[index] = promiseResult;
                yield this.executePromise(iterator, slotIdx);
                if (Object.keys(this.promiseRequestStore).length === 0) {
                    this.globalPromiseStore.resolve(Object.values(this.globalPromiseStore.resolvedPromises));
                    this.promiseRequestStore = { done: true };
                }
            }));
        });
    }
    dispatch(promiseCallbacks) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    this.executePromise(it, slotId);
                    ``;
                }
            });
        });
    }
}

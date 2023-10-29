
declare const getModeObject: (config?: { debugMode?: boolean }) => {
  SEQUENTIAL: () => (promises: (() => Promise<any>)[]) => Promise<any>;
  BATCHED: (
    batchSize?: number,
    batchWiseCallback?: () => any
  ) => (promises: (() => Promise<any>)[]) => Promise<any[]>;
  PIPELINING: (
    slotSize?: number
  ) => (promiseCallbacks: (() => Promise<any>)[]) => Promise<any[]>;
};

export { getModeObject };

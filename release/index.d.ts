/// <reference path="../src/types/index.d.ts" />
/**
 * Initializing the fetcher and will return the mode Object from which any mode can be initialized.
 * @param requestMode
 * @param config
 * @returns Function
 */
declare const getModeObject: (config?: {
    debugMode: boolean;
}) => {
    SEQUENTIAL: () => (promises: (() => Promise<any>)[]) => Promise<any>;
    BATCHED: (batchSize?: number, batchWiseCallback?: (...args: any[]) => void) => (promises: (() => Promise<any>)[]) => Promise<any[]>;
    PIPELINING: (slotSize?: number) => (promiseCallbacks: (() => Promise<any>)[]) => Promise<any[]>;
};
export { getModeObject };

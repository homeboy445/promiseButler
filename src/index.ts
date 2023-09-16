import { FETCH_MODES } from "./enums/modes";
import BatchedFetch from "./modes/batched";
import PipelinedFetch from "./modes/pipelined";
import SequentialFetch from "./modes/sequential";

/**
 * Initializing the fetcher and will return the appropriate callback for 
 * @param requestMode 
 * @param config 
 * @returns Function
 */
const getInitializer = (
  requestMode: FETCH_MODES = FETCH_MODES.SEQUENTIAL,
  config: { debugMode: boolean } = { debugMode: false }
): ((options: {
    slotSize: number;
    batchWiseCallback: (...args: any[]) => void;
    promiseCompleteCallback: (...args: any[]) => void;
  }) => (promises: Array<() => Promise<any>>) => Promise<any[]>) => {
  switch (requestMode) {
    case FETCH_MODES.SEQUENTIAL: {
      return (options: any = {}) => {
        const modeObject = new SequentialFetch(config);
        return modeObject.dispatch.bind(modeObject);
      };
    }
    case FETCH_MODES.BATCHED: {
      return (options: {
        slotSize: number;
        batchWiseCallback: (...args: any[]) => void;
      }) => {
        const modeObject = new BatchedFetch({ ...config, ...options });
        return modeObject.dispatch.bind(modeObject);
      };
    }
    case FETCH_MODES.PIPELINING: {
      return (options: {
        slotSize: number;
        promiseCompleteCallback: (...args: any[]) => void;
      }) => {
        const modeObject = new PipelinedFetch({ ...config, ...options });
        return modeObject.dispatch.bind(modeObject);
      };
    }
    default: {
      throw new Error("Invalid mode!");
    }
  }
};
//https://cdn.jsdelivr.net/gh/homeboy445/promiseManager@1.0.0/release/main.js

export { getInitializer };

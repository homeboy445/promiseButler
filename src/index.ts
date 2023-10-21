import { FETCH_MODES } from "./enums/modes";
import BatchedFetch from "./modes/batched";
import PipelinedFetch from "./modes/pipelined";
import SequentialFetch from "./modes/sequential";
import { GenericObject } from "./types/promiseManager";

/**
 * Initializing the fetcher and will return the appropriate callback for
 * @param requestMode
 * @param config
 * @returns Function
 */
const getModeObject = (
  config: { debugMode: boolean } = { debugMode: false }
): GenericObject => {
  return {
    [FETCH_MODES.SEQUENTIAL]: () => {
      const modeObject = new SequentialFetch(config);
      return modeObject.dispatch.bind(modeObject);
    },
    [FETCH_MODES.BATCHED]: (
      batchSize = 6,
      batchWiseCallback = (...args: any[]) => {}
    ) => {
      const modeObject = new BatchedFetch({
        ...config,
        batchSize,
        batchWiseCallback,
      });
      return modeObject.dispatch.bind(modeObject);
    },
    [FETCH_MODES.PIPELINING]: (
      slotSize = 6
    ) => {
      const modeObject = new PipelinedFetch({
        ...config,
        slotSize,
      });
      return modeObject.dispatch.bind(modeObject);
    },
  };
};
// https://cdn.jsdelivr.net/gh/homeboy445/promiseManager@1.0.0/release/main.js

export { getModeObject };

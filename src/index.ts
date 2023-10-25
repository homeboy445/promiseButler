/// <reference path="types/index.d.ts" />
import { getModeObject } from "promise-manager";
import { FETCH_MODES } from "./enums/modes";
import BatchedFetch from "./modes/batched";
import PipelinedFetch from "./modes/pipelined";
import SequentialFetch from "./modes/sequential";

/**
 * Initializing the fetcher and will return the mode Object from which any mode can be initialized.
 * @param requestMode
 * @param config
 * @returns Function
 */
const getModeObject: getModeObject = (
  config = { debugMode: false }
) => {
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

export { getModeObject };

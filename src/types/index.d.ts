declare module "promise-manager" {
  namespace promiseManager {
    export type getModeObject = (config: { debugMode: boolean }) => {
      SEQUENTIAL: () => (promises: (() => Promise<any>)[]) => Promise<any>;
      BATCHED: (
        batchSize?: number,
        batchWiseCallback?: () => any
      ) => (promises: (() => Promise<any>)[]) => Promise<any[]>;
      PIPELINING: (
        slotSize?: number
      ) => (promiseCallbacks: (() => Promise<any>)[]) => Promise<any[]>;
    };

    export type GenericObject = { [props: string]: any };

    export interface IPromiseManager {
      debugMode: boolean;
      dispatch: (promises: Array<() => Promise<any>>) => Promise<any>;
    }
  }
  export = promiseManager;
}

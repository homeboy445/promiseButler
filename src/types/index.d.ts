export type GenericObject = { [props: string]: any };

export interface IPromiseManager {
  debugMode: boolean;
  dispatch: (promises: Array<() => Promise<any>>) => Promise<any>;
}

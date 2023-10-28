# Promise Butler
The Promise Butler is a versatile JavaScript package designed to manage the execution of promises in various ways. With this package, you can control whether promises are executed sequentially, in batches, or in a pipelined manner. This flexibility allows you to optimize the handling of asynchronous operations in your applications. The promise manager expects an array of callbacks which is expected to return a promise, with which it takes care of the promise execution.

<br>

# Installation

## Bundled File
[main.min.js](https://github.com/homeboy445/promiseButler/blob/main/release/index.js)

<br>

## CDN link (loading bundled file externally)
[https://cdn.jsdelivr.net/gh/homeboy445/promiseManager/release/main.min.js](https://cdn.jsdelivr.net/gh/homeboy445/promiseManager/release/main.min.js)

<br>

## NPM Package
Install it via ```npm i promise-butler``` (https://www.npmjs.com/package/promise-butler).
<br>
<br>
<br>

# Code Walkthrough

### Supported import modes
- Imports via ESM mode using ```import/export```.
- Imports via Common JS using ```require``` (ideal for NodeJS).
- The bundled lib file is loaded as UMD which instantiates the package globally.

## Below is for the usage via CDN & as a package.

### SEQUENTIAL MODE
- The executor callback will accept no params.

<strong>via Bundled file</strong>
```
const promiseArray = [() => Promise.resolve(), () => Promise.resolve()]; // Store the callbacks in the array which would return the promise to be awaited!
const { getModeObject } = promiseButler;
const promiseExecutorCallback = getModeObject().SEQUENTIAL();
await promiseExecutorCallback(promiseArray);
```
<strong>via ES6 imports</strong>
```
import { getModeObject } from "promise-butler";
const promiseArray = [() => Promise.resolve(), () => Promise.resolve()];
const promiseExecutorCallback = getModeObject().SEQUENTIAL();
await promiseExecutorCallback(promiseArray);
```
<br>

### BATCHING MODE
- The execute callback will accept two params, namely:-
  - <strong>batchSize (1st positional param)</strong>: The number of batches the promise array should be divided into.
  - <strong>batchWiseCallback (2nd positional param)</strong>: The callback that is to be executed as soon a batch gets completed.

<strong>via Bundled file</strong>
```
const promiseArray = [() => Promise.resolve(), () => Promise.resolve()]; // Store the callbacks in the array which would return the promise to be awaited!
const { getModeObject } = promiseButler;
const promiseExecutorCallback = getModeObject().BATCHED(6 /*batchSize*/, () => console.log("a batch got completed!") /*batchWiseCallback*/);
await promiseExecutorCallback(promiseArray);
```
<strong>via ES6 imports</strong>
```
import { getModeObject } from "promise-butler";
const promiseArray = [() => Promise.resolve(), () => Promise.resolve()];
const promiseExecutorCallback = getModeObject().BATCHED(6 /*batchSize*/, () => console.log("a batch got completed!") /*batchWiseCallback*/);
await promiseExecutorCallback(promiseArray);
```
<br>

### PIPELINING MODE
- The execute callback will accept on param, namely:-
  - <strong>slotSize (1st positional param)</strong>: The number of slots the promises should be allocated to.

<strong>via Bundled file</strong>
```
const promiseArray = [() => Promise.resolve(), () => Promise.resolve()]; // Store the callbacks in the array which would return the promise to be awaited!
const { getModeObject } = promiseButler;
const promiseExecutorCallback = getModeObject().PIPELINING(6 /*slotSize*/);
await promiseExecutorCallback(promiseArray);
```
<strong>via ES6 import</strong>
```
import { getModeObject } from "promise-butler";
const promiseArray = [() => Promise.resolve(), () => Promise.resolve()]; // Store the callbacks in the array which would return the promise to be awaited!
const promiseExecutorCallback = getModeObject().PIPELINING(6 /*slotSize*/);
await promiseExecutorCallback(promiseArray);
```
<br>
<br>

# Modes
<strong><ins>FETCH_MODES.SEQUENTIAL</ins></strong>: Promises are executed sequentially, one after another.

![image](https://github.com/homeboy445/promiseManager/assets/61937872/4dc05ddc-d882-4f01-a0ba-386c31e1fd75)
<br>
<br>

<ins><strong>FETCH_MODES.BATCHED</strong></ins>: Promises are executed in batches, allowing for concurrent execution within each batch. A batch will consist of any non-zero number and the promises will be awaited batch-wise, for illustration: `Promise.all(batch1).then(() => Promise.all(batch2))`

![image](https://github.com/homeboy445/promiseManager/assets/61937872/4baa6352-4651-4087-ad67-bbd91c84bda1)
<br>
<br>

<ins><strong>FETCH_MODES.PIPELINING</strong></ins>: Promises will be executed in a slot-wise manner i.e. promises will be assigned to certain slots and the rest of the promises will be executed as soon as the slots get free - leading to proper resource utilization. This will ultimately also lead to promises being executed in a PIPELINED fashion.

![image](https://github.com/homeboy445/promiseManager/assets/61937872/7fe6a226-c5db-4384-a339-4879daa54c90)
<br>

## Issues
- If any issue is there in any of the modes, please feel free to report it by creating a ticket.


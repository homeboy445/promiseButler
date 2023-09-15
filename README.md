# Promise Manager
The Promise Manager is a versatile JavaScript package designed to manage the execution of promises in various ways. With this package, you can control whether promises are executed sequentially, in batches, or in a pipelined manner. This flexibility allows you to optimize the handling of asynchronous operations in your applications. The promise manager expects an array of callback which is expected to return a promise, with which it takes care of the promise execution.

NOTE: This is development & is not ready for use at the moment. This package will be published to npm once its DEV DONE.

The getInitializer function allows you to select from three execution modes:

- FETCH_MODES.SEQUENTIAL: Promises are executed sequentially, one after another.
- FETCH_MODES.BATCHED: Promises are executed in batches, allowing for concurrent execution within each batch.
- FETCH_MODES.PIPELINING: Promises are executed in a pipelined manner, with data flowing from one promise to the next.

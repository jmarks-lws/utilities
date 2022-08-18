# Structural Functions

## argsAsArray

> Wraps a function that normally accepts multiple parameters such that the elements can be provided as an array.
```js
argsAsArray(fn)
```



### Parameters

| Name | Type | Required | Description           |
| ---- | ---- | -------- | --------------------- |
| fn   |      | yes      | The function to wrap. |

## branch

> Functional style conditional
```js
branch(condition, truePath, falsePath)
```



### Parameters

| Name      | Type | Required | Description                                            |
| --------- | ---- | -------- | ------------------------------------------------------ |
| condition |      | yes      | An expression representing the query                   |
| truePath  |      | yes      | A function to apply when `condition` resolves to true  |
| falsePath |      | yes      | A function to apply when `condition` resolves to false |

## curry

> Returns a curried version of the provided function.(Note: This will probably mess with your IDE's ability to provide intellisense)

[Borrowed from Mostly Adequate Guide](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/content/appendix_a.html#curry)

Signature: curry :: ((a, b, ...) => c) => a => b => ... => c
```js
curry(fn)
```



### Parameters

| Name | Type | Required | Description       |
| ---- | ---- | -------- | ----------------- |
| fn   |      | yes      | Function to curry |

## identity

> Returns the value given. Intended for used in some branching expressions as a means of ensuringwe always return a function value to reduce complexity otherwise introduced with null checking, etc.
```js
identity(id)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| id   |      | yes      |             |

## isFunction

> Determines if the provided object or the key of the provided object is a function.If only `x` is provided, then it will be the target. If both `x` and `key` are provided, `x[key]` is the target.
```js
isFunction(x, key)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| x    |      | yes      |             |
| key  |      | yes      |             |

## iterateAsync

> Asynchronously loop over an Array or over a JS object as if it were an associative array. Inspired by the PHP implementationof `foreach`, returning an array result similar to what you might get from `Array.prototype.map()`

The differences between this and the synchronous `iterate` are:
 - Most importantly, the body of the provided function may `await` other asynchronous functions
 - This function itself is asynchronous and therefore can - and usually should - be awaited.
 - You must provide an async function (which therefore returns a Promise) as the second parameter
```js
iterateAsync(hash, fn)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| hash |      | yes      |             |
| fn   |      | yes      |             |

## mapAsync

> Like `map()`, but awaitable. This way you can ensure mapped async functions have resolved, if desired.
```js
mapAsync(list, fn)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| list |      | yes      |             |
| fn   |      | yes      |             |

## mapAsyncSequential

> Provides map()-like wrapper functionality for times when the map operation would use `await`. Waitsfor each step to complete sequentially before moving on to the next, in opposition to standard
asynchronous patterns.

Useful when you need to throttle third party service requests.
```js
mapAsyncSequential(list, fn, init)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| list |      | yes      |             |
| fn   |      | yes      |             |
| init |      | yes      |             |

## maxOnce

> Convenience method providing a wrapper that can only run an enclosed function once. Delegates to `maxTimes`Warning:
  Use cautiously. Calling the resulting function more than one time will return `null`.
```js
maxOnce(fn, context)
```



### Parameters

| Name    | Type | Required | Description                                                      |
| ------- | ---- | -------- | ---------------------------------------------------------------- |
| fn      |      | yes      | Function to wrap                                                 |
| context |      | yes      | An optional context to provide `this` for the enclosed function. |

## maxTimes

> Wrap a function so that it will only run at most `times` times when called from the resulting wrapper.
Note:
  Contrary to this library's overall design philosophy, by its nature, `maxTimes()` often results in a
  function which causes side effects.

Warning:
  Use cautiously. Calling the resulting function more than the allotted number of times will return `null`.
```js
maxTimes(times, fn, context)
```



### Parameters

| Name    | Type | Required | Description                                                      |
| ------- | ---- | -------- | ---------------------------------------------------------------- |
| times   |      | yes      | Number of times to allow this function to run                    |
| fn      |      | yes      | Function to wrap                                                 |
| context |      | yes      | An optional context to provide `this` for the enclosed function. |

## partial

> Partially apply a function by filling in any number of its arguments.Note: We will often lose some of typescript's intellisense when using `partial()`
```js
partial(fn, args)
```



### Parameters

| Name | Type | Required | Description                                                                            |
| ---- | ---- | -------- | -------------------------------------------------------------------------------------- |
| fn   |      | yes      | The function to partially apply                                                        |
| args |      | yes      | Some arguments. Does not have to be all of the arguments needed for the base function. |

## reduceAsync

> Alias for `reduceAsyncSequential`
```js
reduceAsync()
```



## reduceAsyncSequential

> Provides reduce()-like wrapper functionality for times when the reducer would use `await`. By nature,waits for each step to complete sequentially before moving on to the next, in opposition to standard
asynchronous patterns.

Useful when you need to throttle third party service requests.
```js
reduceAsyncSequential(list, fn, init)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| list |      | yes      |             |
| fn   |      | yes      |             |
| init |      | yes      |             |

## repeat

> Functional alternative to the standard for loop.
```js
repeat(repeatTimes, fn, args)
```



### Parameters

| Name        | Type | Required | Description |
| ----------- | ---- | -------- | ----------- |
| repeatTimes |      | yes      |             |
| fn          |      | yes      |             |
| args        |      | yes      |             |

## repeatAsync

> Functional alternative to the standard for loop. Allows `await` usage inside loop code.
```js
repeatAsync(repeatTimes, fn, args)
```



### Parameters

| Name        | Type | Required | Description |
| ----------- | ---- | -------- | ----------- |
| repeatTimes |      | yes      |             |
| fn          |      | yes      |             |
| args        |      | yes      |             |

## repeatAsyncWithBreak

> Like `repeatAsync`, but provides a callable `done` function which can be used like a `break`
```js
repeatAsyncWithBreak(repeatTimes, fn, args)
```



### Parameters

| Name        | Type | Required | Description |
| ----------- | ---- | -------- | ----------- |
| repeatTimes |      | yes      |             |
| fn          |      | yes      |             |
| args        |      | yes      |             |

## repeatWhile

> Functional alternative to the standard while loop.
```js
repeatWhile(repeatCondition, fn, args)
```



### Parameters

| Name            | Type | Required | Description |
| --------------- | ---- | -------- | ----------- |
| repeatCondition |      | yes      |             |
| fn              |      | yes      |             |
| args            |      | yes      |             |

## repeatWhileAsync

> Functional alternative to the standard while loop. Allows `await` usage inside loop code.
```js
repeatWhileAsync(repeatCondition, fn, args)
```



### Parameters

| Name            | Type | Required | Description |
| --------------- | ---- | -------- | ----------- |
| repeatCondition |      | yes      |             |
| fn              |      | yes      |             |
| args            |      | yes      |             |

## repeatWithBreak

> Like `repeat`, but provides a callable `done` function which can be used like a `break`
```js
repeatWithBreak(repeatTimes, fn, args)
```



### Parameters

| Name        | Type | Required | Description |
| ----------- | ---- | -------- | ----------- |
| repeatTimes |      | yes      |             |
| fn          |      | yes      |             |
| args        |      | yes      |             |

## reverseArgs

> Reverses the order of arguments in a function call. Helpful for many 'functional programming' tasks.
```js
reverseArgs(fn)
```



### Parameters

| Name | Type | Required | Description                            |
| ---- | ---- | -------- | -------------------------------------- |
| fn   |      | yes      | The function to reverse arguments for. |

## selectBranch

> Call the function in `callMap`, indicated by the key in `callMap` matching the input `key`.Optionally provide parameters using `args`
```js
selectBranch(key, callMap, args)
```



### Parameters

| Name    | Type | Required | Description |
| ------- | ---- | -------- | ----------- |
| key     |      | yes      |             |
| callMap |      | yes      |             |
| args    |      | yes      |             |

## spreadArgs

> Wraps a function that normally accepts a single array as an argument so that elements can be provided as individual parameters
```js
spreadArgs(fn)
```



### Parameters

| Name | Type | Required | Description          |
| ---- | ---- | -------- | -------------------- |
| fn   |      | yes      | The function to wrap |

## take

> (Don't use this - deprecation incoming quickly) Provides an English-esque interface for getting a key from an object with a default value.
```js
take(key, defaultValue)
```



### Parameters

| Name         | Type | Required | Description |
| ------------ | ---- | -------- | ----------- |
| key          |      | yes      |             |
| defaultValue |      | yes      |             |

## tryCatch

> Functional style try catch expression
```js
tryCatch(tryPath, catchPath, finallyPath)
```



### Parameters

| Name        | Type | Required | Description                                                       |
| ----------- | ---- | -------- | ----------------------------------------------------------------- |
| tryPath     |      | yes      | A function which contains the initial code that will be attempted |
| catchPath   |      | yes      | A function which handles errors if they occur in `tryPath`        |
| finallyPath |      | yes      | A function that is run after try or finally.                      |
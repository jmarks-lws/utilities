# Asynchronous Helper Functions

Functions which abstract working with asynchronous code to make it feel more natural.

## adopt

> 
```js
adopt()
```



## delay

> Asynchronously delays for a period of time before resolving a promise. Resolves with the delay time.
```js
delay(milliseconds)
```



### Parameters

| Name         | Type | Required | Description                                                                                       |
| ------------ | ---- | -------- | ------------------------------------------------------------------------------------------------- |
| milliseconds |      | yes      | amount of time to wait before resolving the promise. This will be returned as the resolved value. |

## fulfilled

> 
```js
fulfilled()
```



## rejected

> 
```js
rejected()
```



## retryAsync

> Retry an asynchronous operation multiple times until errors are not thrown. Use options to manage timeout and attempts.
```js
retryAsync(fn, options.delayFirstAttempt, options.timeout, options.attempts, options.echo?, options.throwOnFail?)
```



### Parameters

| Name                      | Type | Required | Description                                                                                                                 |
| ------------------------- | ---- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| fn                        |      | yes      | an asynchronous function with no arguments. If this returns a value, retryAsync will return the same value when successful. |
| options.delayFirstAttempt |      | yes      | whether the first attempt should be delayed. defaults to `false`.                                                           |
| options.timeout           |      | yes      | time in milliseconds before making each attempt. defaults to 60 seconds.                                                    |
| options.attempts          |      | yes      | total number of attempts before final failure. defaults to 5.                                                               |
| options.echo?             |      | yes      | what, if anything, to output before each retry.                                                                             |
| options.throwOnFail?      |      | yes      | a custom error to throw on final failure. If not provided a default error will be thrown.
   }                              |

## step

> 
```js
step()
```


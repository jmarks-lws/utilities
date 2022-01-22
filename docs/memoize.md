# Memoization

## memoize

> Memoize a function. Returns a function, which when called multiple timeswith the same parameters, will return a cached response.
`cacheProxy` is recommended as default caching does not expire.
```js
memoize(fn, cacheProxy)
```



### Parameters

| Name       | Type | Required | Description                                                                                                                                                                                  |
| ---------- | ---- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fn         |      | yes      | The function to memoize. Can be any function at all.                                                                                                                                         |
| cacheProxy |      | yes      | A proxy object that provides a getter and setter which is expected to manage cached data.
                    Works great with in memory caches that expire such as `redis` and `node-cache` |
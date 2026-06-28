# object-hash

Generate compact, stable keys from objects and values in node and the browser.

This is a vendored, **dependency-free** fork of [`object-hash`](https://github.com/puleos/object-hash).
The upstream library used node's `crypto` module to digest values; that
dependency was deliberately removed so this utility works unchanged in the
browser and in any bundler, and so the parent library keeps **zero runtime
dependencies**. As a result it no longer offers the crypto algorithms (`sha1`,
`md5`, ...). Instead it serializes the value and runs a tiny, dependency-free
non-cryptographic digest (cyrb53, a member of the FNV family) over it.

> **Note:** the output is a fast, well-distributed, collision-resistant key for
> things like cache lookups and grouping. It is **not** a cryptographic hash and
> must not be relied on for security.

```js
const hash = require('object-hash');

hash({ foo: 'bar' }) // => a fixed-length 16-char hex digest, e.g. 'a1b2c3d4e5f60718'
```

This module is **internal** to `@jamesgmarks/utilities` (used by `memoize` to
derive cache keys for object-typed arguments). It is not part of the public API.

## hash(value, options)

Generate a digest from any object or type. Defaults to the `fnv1a` algorithm.

*  `algorithm` digest to be used: `'fnv1a'` (serialize, then apply the
   non-cryptographic digest — fixed-length 16-char hex) or `'passthrough'`
   (return the raw serialized string with no digest). default: `fnv1a`
*  `excludeValues` {true|false} hash object keys, values ignored. default: false
*  `ignoreUnknown` {true|false} ignore unknown object types. default: false
*  `replacer` optional function that replaces values before hashing. default: accept all values
*  `respectFunctionProperties` {true|false} Whether properties on functions are considered when hashing. default: true
*  `respectFunctionNames` {true|false} consider `name` property of functions for hashing. default: true
*  `respectType` {true|false} Whether special type attributes (`.prototype`, `.__proto__`, `.constructor`)
   are hashed. default: true
*  `unorderedArrays` {true|false} Sort all arrays before hashing. Note that this affects *all* collections,
   i.e. including typed arrays, Sets, Maps, etc. default: false
*  `unorderedSets` {true|false} Sort `Set` and `Map` instances before hashing, i.e. make
   `hash(new Set([1, 2])) == hash(new Set([2, 1]))` return `true`. default: true
*  `unorderedObjects` {true|false} Sort objects before hashing, i.e. make `hash({ x: 1, y: 2 }) === hash({ y: 2, x: 1 })`. default: true
*  `excludeKeys` optional function for excluding specific key(s) from hashing; if it returns true the key is excluded. default: include all keys

## hash.keys(value)

Hash object keys only, values ignored. Useful for grouping similar objects with
different values.

*Sugar method, equivalent to `hash(value, { excludeValues: true })`*

## hash.writeToStream(value, [options,] stream)

Write the serialized form (the input to the digest) to a stream, e.g.:
```js
hash.writeToStream({ foo: 'bar', a: 42 }, { respectType: false }, process.stdout)
// => e.g. 'object:a:number:42foo:string:bar'
```

## License
MIT (see `LICENSE`). Original work © 2014 object-hash contributors.

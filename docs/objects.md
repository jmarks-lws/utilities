# Objects

An arsenal of functions for working with objects without modifying the source array.

## addField

> alias for `addProp()`
```js
addField()
```



## addProp

> Returns an object that is the result adding a property to `o`.
```js
addProp(o, key, val)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| o    |      | yes      |             |
| key  |      | yes      |             |
| val  |      | yes      |             |

## alterProp

> 
```js
alterProp()
```



## arraysToObject

> Creates an object having keys from `keysArray` matching values from `valuesArray`. Assumes both arrays are the length of `keysArray`.
```js
arraysToObject(keysArray, valuesArray)
```



### Parameters

| Name        | Type | Required | Description |
| ----------- | ---- | -------- | ----------- |
| keysArray   |      | yes      |             |
| valuesArray |      | yes      |             |

## clone

> Does a shallow copy of an object. Not usually what you want as it maintains referenceswhen values are reference types. If you need something more complete, use `deepClone()`.

Note: this is NOT intended for instances of class objects (those created with the `new` keyword, etc.)
```js
clone(obj)
```



### Parameters

| Name | Type | Required | Description     |
| ---- | ---- | -------- | --------------- |
| obj  |      | yes      | Object to copy. |

## compactObject

> Returns a new object with a subset of properties where properties which have null or undefined values have been removed.
```js
compactObject(o)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| o    |      | yes      |             |

## deepClone

> Does a deep copy of an object ensuring that reference values are recursively clones such that the resultingobject value does not refer to the same memory location that the source object value does. This is usually
preferred over the `clone()` method.

Note: this is NOT intended for instances of class objects (those created with the `new` keyword, etc.)
```js
deepClone(obj)
```



### Parameters

| Name | Type | Required | Description     |
| ---- | ---- | -------- | --------------- |
| obj  |      | yes      | Object to copy. |

## deepMerge

> 
```js
deepMerge()
```



## diff

> Provides a list of change types where the "from" object is `a` and the "to" object is `b`.'-' indicates a field was removed, '+' indicates a field was added, and '~' indicates that the value of a field has changed.
```js
diff(a, b)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| a    |      | yes      |             |
| b    |      | yes      |             |

## filterKeys

> Returns a new object with a subset of properties where only properties with keys that pass the provided filter are returned.
```js
filterKeys(o)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| o    |      | yes      |             |

## findKey

> Similar to findIndex for arrays. Searches for the first value meeting the condition determined by the `condition`function parameter and returns the corresponding key.
```js
findKey(object, condition)
```



### Parameters

| Name      | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| object    |      | yes      |             |
| condition |      | yes      |             |

## flattenObject

> Reduces object to a flat key-value list with no nested objects.Warning: This method is destructive. If a nested object has the same key as a parent object, the value will be
overwritten with by the value from the nested object. This applies at any depth.
You will also lose the original keys corresponding to the nested objects.
```js
flattenObject(object)
```



### Parameters

| Name   | Type | Required | Description           |
| ------ | ---- | -------- | --------------------- |
| object |      | yes      | The object to flatten |

## fullDiff

> Provides a list of change descriptions where the "from" object is `a` and the "to" object is `b`.'-' indicates a field was removed, '+' indicates a field was added
```js
fullDiff(a, b)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| a    |      | yes      |             |
| b    |      | yes      |             |

## getSharedKeys

> Gets a list of keys that exist in both `a` and `b` and returns them as a new string array.
```js
getSharedKeys(a, b)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| a    |      | yes      |             |
| b    |      | yes      |             |

## hasDiff

> Returns a boolean indicating whether the two provided objects have different data.
```js
hasDiff(a, b)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| a    |      | yes      |             |
| b    |      | yes      |             |

## hasKey

> Returns a boolean indicating whether a given key exists in the provided object.
```js
hasKey(o, k)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| o    |      | yes      |             |
| k    |      | yes      |             |

## identical

> Compares two objects. If you were to print out the values of both objects on paper and they wouldboth look identical, this function would return `true` when provided those two objects - regardless
of whether the two items being compared are actually the same object stored in the same part of the
computer's memory.
```js
identical(a, b)
```



### Parameters

| Name | Type | Required | Description               |
| ---- | ---- | -------- | ------------------------- |
| a    |      | yes      | First object to compare.  |
| b    |      | yes      | Second object to compare. |

## immutable

> Returns a copy of the provided object that cannot be changed and does not allow mutator methods.
```js
immutable(object)
```



### Parameters

| Name   | Type | Required | Description                   |
| ------ | ---- | -------- | ----------------------------- |
| object |      | yes      | The object to make immutable. |

## invert

> Returns a new object where the keys and corresponding values of `obj` have been swapped with each other.
```js
invert(obj)
```



### Parameters

| Name | Type | Required | Description      |
| ---- | ---- | -------- | ---------------- |
| obj  |      | yes      | Object to invert |

## isDefinedObject

> Returns a boolean indicating whether `x` is a non null object. Does not return true for an array or a null value.
```js
isDefinedObject()
```



## iterate

> Loop over an Array or over a JS object as if it were an associative array. Inspired by the PHP implementationof `foreach`, returning an array result similar to what you might get from `Array.prototype.map()`
```js
iterate(hash, fn)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| hash |      | yes      |             |
| fn   |      | yes      |             |

## iterateWithBreak

> Similar to `forEach`, but allows short-circuiting by calling the provided `_break` callback function.Loop over a JS object as if it were an array where the property names are associative keys.

Note: This is "magic" and should probably be handled by the consumer, but remains for backwards compatibility.
```js
iterateWithBreak(hash, fn)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| hash |      | yes      |             |
| fn   |      | yes      |             |

## keyList

> Exactly like `Object.keys`, but different. Return type ensures keys of the provided object, which helps immenselywith typescript (and usuallay javascript) intellisense software that can read typescript definition files.
```js
keyList(o)
```



### Parameters

| Name | Type | Required | Description             |
| ---- | ---- | -------- | ----------------------- |
| o    |      | yes      | Object to get keys from |

## keys

> Get (typed) keys of provided object
```js
keys()
```



## mapKeys

> Performs a map operation on all keys of the provided object
```js
mapKeys(o, fn)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| o    |      | yes      |             |
| fn   |      | yes      |             |

## merge

> Returns a new object that is the result of merging together a series of objects. Values to the rightoverwrite values before them.
```js
merge(a)
```



### Parameters

| Name | Type            | Required | Description                                                      |
| ---- | --------------- | -------- | ---------------------------------------------------------------- |
| a    | [object Object] | yes      | As many hashes as you like to merge together from left to right. |

## mergeIntersection

> Returns a new object that is the result of merging together two objects ONLY on keys that both share.If `a` and `b` have differing values for a property, the resulting object will receive its value from object `b`.
This is a shallow and fast merge. More complex needs may need to be managed differently.
```js
mergeIntersection(a, b)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| a    |      | yes      |             |
| b    |      | yes      |             |

## mergeRight

> Returns a new object that is the result of merging together a series of objects going from the last tothe first objects. Values to the left overwrite values to their right.
```js
mergeRight(a)
```



### Parameters

| Name | Type            | Required | Description                                                      |
| ---- | --------------- | -------- | ---------------------------------------------------------------- |
| a    | [object Object] | yes      | As many hashes as you like to merge together from left to right. |

## noDiff

> Returns a boolean indicating whether the two provided objects do NOT have different data.
```js
noDiff(a, b)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| a    |      | yes      |             |
| b    |      | yes      |             |

## pick

> Returns a new object that is the result of projecting only the properties of `obj` listed in `fields`.
```js
pick(obj, fields)
```



### Parameters

| Name   | Type | Required | Description                                                                  |
| ------ | ---- | -------- | ---------------------------------------------------------------------------- |
| obj    |      | yes      | The source object from which to construct a result with its fields selected. |
| fields |      | yes      | A string array containing the names of fields to remove                      |

## pickNot

> Returns a new object that is the result of projecting only the properties of `o` not listed in `fields`.
```js
pickNot(fields, o)
```



### Parameters

| Name   | Type | Required | Description                                                                 |
| ------ | ---- | -------- | --------------------------------------------------------------------------- |
| fields |      | yes      | A string array containing the names of fields to remove                     |
| o      |      | yes      | The source object from which to construct a result with its fields removed. |

## pluck

> Safely get a value from an object
```js
pluck(obj, field)
```



### Parameters

| Name  | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| obj   |      | yes      |             |
| field |      | yes      |             |

## prop

> Gets a value from an object property with an optional default value.
```js
prop(o, key, defaultValue)
```



### Parameters

| Name         | Type | Required | Description |
| ------------ | ---- | -------- | ----------- |
| o            |      | yes      |             |
| key          |      | yes      |             |
| defaultValue |      | yes      |             |

## reduceObject

> Works just like `reduce` would for an array, only iterating over the entries of an object.
```js
reduceObject(obj, callbackfn, initialValue)
```



### Parameters

| Name         | Type | Required | Description                                                                                      |
| ------------ | ---- | -------- | ------------------------------------------------------------------------------------------------ |
| obj          |      | yes      | The object to iterate over. Each entry will be processed, one at a time by the reducer function. |
| callbackfn   |      | yes      | a function that will transform the accumulated value on every step.                              |
| initialValue |      | yes      | starting value before iteration begins.                                                          |

## remapKeys

> Returns a new object derived from `obj` where the keys are changed as described by `remap`, optionally including or omitting remaining data.
```js
remapKeys(obj, remap, returnAll)
```



### Parameters

| Name      | Type | Required | Description                                                                                                                                                                                                                    |
| --------- | ---- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| obj       |      | yes      | Source object to remap keys                                                                                                                                                                                                    |
| remap     |      | yes      | A map of key value pairs where the keys match keys from the source object and the values are the new object key names                                                                                                          |
| returnAll |      | yes      | Default `false`. If this is true, all data from the source object will be returned with only the key names in
                 `remap` being changed. All other keys and values will remain as they were in the source object. |

## removeField

> alias for `removeProp`
```js
removeField()
```



## removeProp

> Returns an object that is the result of removing a field from `o` by name.
```js
removeProp()
```



## transformKeys

> Works similarly to mapping an array, but maps the keys of `o`, returning a new object that hasthe same values with their keys each transformed by `fn`.
```js
transformKeys()
```



## transformValues

> Works similarly to mapping an array, but maps the values of `o`, returning a new object that hasthe same keys with values each transformed by `fn`.
```js
transformValues()
```



## values

> Returns an array of values of the enumerable properties of an object
```js
values(o)
```



### Parameters

| Name | Type | Required | Description                                                                                                                                  |
| ---- | ---- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| o    |      | yes      | — Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object. |

## zip

> Zips two arrays into an array of tuples. Assumes both arrays are the length of `keysArray`
```js
zip(keysArray, valuesArray)
```



### Parameters

| Name        | Type | Required | Description |
| ----------- | ---- | -------- | ----------- |
| keysArray   |      | yes      |             |
| valuesArray |      | yes      |             |
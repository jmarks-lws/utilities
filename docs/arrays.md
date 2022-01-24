# Arrays

An arsenal of functions for working with arrays without modifying the source array.

## aggregate

> Alias for `reduce()`
```js
aggregate()
```



## aggregateRight

> Alias for `reduceRight()`
```js
aggregateRight()
```



## append

> Concatenates an element on to the end of an array.Can be used as an immutable alternative to Array.prototype.push();
```js
append(array, element)
```



### Parameters

| Name    | Type | Required | Description                            |
| ------- | ---- | -------- | -------------------------------------- |
| array   |      | yes      | The original array                     |
| element |      | yes      | The element to append to the new array |

## arrayCopy

> Shallow copy of an array. References remain intact. If a non-array is supplied, null is returned.
```js
arrayCopy()
```



## arrayEmpty

> Tests `array` to determine if it has a zero length.
```js
arrayEmpty(array)
```



### Parameters

| Name  | Type | Required | Description   |
| ----- | ---- | -------- | ------------- |
| array |      | yes      | array to test |

## arrayWrap

> Returns an array using the following rules: - If an array is provided, the return array will be a copy of the input array
 - If a null or undefined value is provided, a new empty array will be returned.
 - If any other value is provided, the return value will be a new array with the
   original provided value as its only element.
```js
arrayWrap(input)
```



### Parameters

| Name  | Type | Required | Description            |
| ----- | ---- | -------- | ---------------------- |
| input |      | yes      | The value to transform |

## associative

> Alias for `table()`
```js
associative()
```



## chopFirst

> Retreives the first `n` elements from `array` and returns as a new Array.
```js
chopFirst()
```



## chopLast

> Retreives the last `n` elements from `array` and returns as a new Array.
```js
chopLast()
```



## chunkArray

> Returns an array with arrays of the given size.
```js
chunkArray(array, sliceSize)
```



### Parameters

| Name      | Type            | Required | Description         |
| --------- | --------------- | -------- | ------------------- |
| array     | [object Object] | yes      | Array to split      |
| sliceSize | [object Object] | yes      | Size of every group |

## cloneArray

> Clones each of `array`'s individual elements using shallow cloning (`clone` from the object subsetof utilities). Cloned reference values will copy by reference. While this is sometimes useful, you
will usually want `deepCloneArray()`
```js
cloneArray(array)
```



### Parameters

| Name  | Type | Required | Description    |
| ----- | ---- | -------- | -------------- |
| array |      | yes      | Array to clone |

## compactArray

> Removes elements which are null or undefined.
```js
compactArray(array)
```



### Parameters

| Name  | Type | Required | Description      |
| ----- | ---- | -------- | ---------------- |
| array |      | yes      | The source array |

## concat

> Returns an array that is the result of appending each array to the end of the one before it in sequence
```js
concat(args:)
```



### Parameters

| Name  | Type            | Required | Description                       |
| ----- | --------------- | -------- | --------------------------------- |
| args: | [object Object] | yes      | Each argument should be an array. |

## count

> Returns number of elements in `array`.
```js
count(array)
```



### Parameters

| Name  | Type | Required | Description      |
| ----- | ---- | -------- | ---------------- |
| array |      | yes      | The source array |

## countDefined

> Helper method: Determines how many elements in an array are a value other than undefined.
```js
countDefined()
```



## countWhere

> Returns number of elements in `array` matching a given condition.
```js
countWhere(array, fn)
```



### Parameters

| Name  | Type | Required | Description                              |
| ----- | ---- | -------- | ---------------------------------------- |
| array |      | yes      | The source array                         |
| fn    |      | yes      | Function used to filter the source list. |

## deepCloneArray

> Clones `array` ensuring reference types are copied by value and not by reference.
! Warning: This could result in infinite recursion if circular references exist inside the object.
```js
deepCloneArray(array)
```



### Parameters

| Name  | Type | Required | Description    |
| ----- | ---- | -------- | -------------- |
| array |      | yes      | Array to clone |

## deepMergeArrays

> 
```js
deepMergeArrays(a, b, arrayMergeMethod)
```



### Parameters

| Name             | Type | Required | Description |
| ---------------- | ---- | -------- | ----------- |
| a                |      | yes      |             |
| b                |      | yes      |             |
| arrayMergeMethod |      | yes      |             |

## distinct

> Helper method: Returns an array consisting only of distinct values.
```js
distinct(array)
```



### Parameters

| Name  | Type | Required | Description     |
| ----- | ---- | -------- | --------------- |
| array |      | yes      | array to filter |

## distinctObjects

> Helper method: Returns an array consisting only of distinct values. Intended for arrays containing a set ofobjects, which may have different reference values, but have the potential to contain repeat data.
```js
distinctObjects(array)
```



### Parameters

| Name  | Type | Required | Description     |
| ----- | ---- | -------- | --------------- |
| array |      | yes      | array to filter |

## distinctOn

> Returns a new array where only one of each "same" object is returned. Sameness is determined by `equality`.
```js
distinctOn(array, equality)
```



### Parameters

| Name     | Type | Required | Description                                                                                                         |
| -------- | ---- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| array    |      | yes      | The array to filter.                                                                                                |
| equality |      | yes      | A function used to determine whether any two elements are equal. Return `true` for equal and `false` for not equal. |

## distinctOnFields

> Returns a new array where only one of each "same" object is returned. Sameness is determined by comparingthe values of all of the field names indicated in `fieldsToCompare`. Note that reference value types will
not be considered equal unless the two values refer to the exact same referenced object in memory.
```js
distinctOnFields(array, fieldsToCompare)
```



### Parameters

| Name            | Type | Required | Description                                         |
| --------------- | ---- | -------- | --------------------------------------------------- |
| array           |      | yes      | The array to filter                                 |
| fieldsToCompare |      | yes      | The field names of objects in the array to compare. |

## dropFirst

> Returns a new Array consisting of the elements of `array` that would remain after dropping the first `n` elements.
```js
dropFirst()
```



## dropLast

> Returns a new Array consisting of the elements of `array` that would remain after dropping the last `n` elements.
```js
dropLast()
```



## fieldSort

> Returns a NEW array that has been sorted by the provided field. This uses a `<` comparison operator internally, sothe rules which apply to comparing strings will apply to this sort. If you want more control over how this works,
you should use `sort()` and provide your own sortFn implementation. (Note: The original array is unaffected.)
```js
fieldSort(array, fieldName)
```



### Parameters

| Name      | Type | Required | Description                                                                                                                          |
| --------- | ---- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| array     |      | yes      | The array to sort                                                                                                                    |
| fieldName |      | yes      | A field name that will be expected to exist on all objects in the provided array and which will be used to sort the resulting array. |

## filter

> Alias for `where()`
```js
filter()
```



## findFirst

> Returns the first T that matches a provided condition from an Array<T>
```js
findFirst(array, whereFn)
```



### Parameters

| Name    | Type | Required | Description                              |
| ------- | ---- | -------- | ---------------------------------------- |
| array   |      | yes      | The source array                         |
| whereFn |      | yes      | Function used to filter the source list. |

## findIndex

> Returns the index of the first element in the array where predicate is true, and -1 otherwise.
```js
findIndex(array, filterFn)
```



### Parameters

| Name     | Type | Required | Description                                                                                                                                                                                                                                           |
| -------- | ---- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| array    |      | yes      | Array to search.                                                                                                                                                                                                                                      |
| filterFn |      | yes      | — find calls predicate once for each element of the array, in ascending order, until it finds
   one where predicate returns true. If such an element is found, findIndex immediately returns that element index.
   Otherwise, findIndex returns -1. |

## findLast

> Returns the last T that matches a provided condition from an Array<T>
```js
findLast(array, whereFn)
```



### Parameters

| Name    | Type | Required | Description                              |
| ------- | ---- | -------- | ---------------------------------------- |
| array   |      | yes      | The source array                         |
| whereFn |      | yes      | Function used to filter the source list. |

## first

> Returns the first element from an array
```js
first(array)
```



### Parameters

| Name  | Type | Required | Description      |
| ----- | ---- | -------- | ---------------- |
| array |      | yes      | The source array |

## flatten

> Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
```js
flatten(arr, d)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| arr  |      | yes      |             |
| d    |      | yes      |             |

## flattenOnce

> Takes an array of arrays of a desired type and flattens the data out so that all T are in one array.
```js
flattenOnce(arr)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| arr  |      | yes      |             |

## group

> Group array items by a specific key which should exist on all elements of the array.
```js
group(array, key)
```



### Parameters

| Name  | Type | Required | Description                                                              |
| ----- | ---- | -------- | ------------------------------------------------------------------------ |
| array |      | yes      | An ideally flat array of objects                                         |
| key   |      | yes      | The name of the key which should be used as the key for each item group. |

## hasAll

> Asserts that all elements match a given condition
```js
hasAll(array, fn)
```



### Parameters

| Name  | Type | Required | Description                              |
| ----- | ---- | -------- | ---------------------------------------- |
| array |      | yes      | The source array                         |
| fn    |      | yes      | Function used to filter the source list. |

## hasAllDefined

> Helper method: Determines if an array contains no undefined values
```js
hasAllDefined()
```



## hasAny

> Asserts that an array has any elements matching a condition
```js
hasAny(array, fn)
```



### Parameters

| Name  | Type | Required | Description                              |
| ----- | ---- | -------- | ---------------------------------------- |
| array |      | yes      | The source array                         |
| fn    |      | yes      | Function used to filter the source list. |

## hash

> Alias for `table()`
```js
hash()
```



## hashTable

> Alias for `table()`
```js
hashTable()
```



## hasNone

> Asserts that an array does not have any elements matching a condition
```js
hasNone(array, fn)
```



### Parameters

| Name  | Type | Required | Description                              |
| ----- | ---- | -------- | ---------------------------------------- |
| array |      | yes      | The source array                         |
| fn    |      | yes      | Function used to filter the source list. |

## hasNoneDefined

> Helper method: Determines if an array contains only undefined values
```js
hasNoneDefined()
```



## hasOneDefined

> Helper method: Determines if an array contains exactly one defined value
```js
hasOneDefined()
```



## hasSomeDefined

> Helper method: Determines if an array contains one or more defined values
```js
hasSomeDefined()
```



## immutableArray

> Returns a copy of the provided array that cannot be changed and does not allow mutator methods.
```js
immutableArray(array)
```



### Parameters

| Name  | Type | Required | Description                  |
| ----- | ---- | -------- | ---------------------------- |
| array |      | yes      | The array to make immutable. |

## includes

> Determines whether an array includes a certain element, returning true or false as appropriate.Wrapper around `<array>.includes()`.
```js
includes(array, needle, fromIndex)
```



### Parameters

| Name      | Type | Required | Description                                                              |
| --------- | ---- | -------- | ------------------------------------------------------------------------ |
| array     |      | yes      | The array to search through.                                             |
| needle    |      | yes      | The element to search for                                                |
| fromIndex |      | yes      | The position in this array at which to begin searching for searchElement |

## insertAt

> Returns a new array that is the result of inserting `element` to `array` at position `index`
```js
insertAt(array, element, index)
```



### Parameters

| Name    | Type | Required | Description                               |
| ------- | ---- | -------- | ----------------------------------------- |
| array   |      | yes      | The source array                          |
| element |      | yes      | The element to add to the resulting array |
| index   |      | yes      | Where to place the element                |

## intersect

> Returns a new array consisting of elements that exist in both `a` and `b`
```js
intersect(a, b)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| a    |      | yes      |             |
| b    |      | yes      |             |

## isArray

> Wrapper for native `Array.isArray()`
```js
isArray()
```



## join

> Create a string which is the result of concatenating the string values of each `array` element, using `delimiter` as a separator.
```js
join(array, delimiter)
```



### Parameters

| Name      | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| array     |      | yes      |             |
| delimiter |      | yes      |             |

## last

> Returns the last T from an Array<T>
```js
last(array)
```



### Parameters

| Name  | Type | Required | Description      |
| ----- | ---- | -------- | ---------------- |
| array |      | yes      | The source array |

## map

> Utility mapping function for functional style programming.
```js
map(array, mapFn)
```



### Parameters

| Name  | Type | Required | Description                                                       |
| ----- | ---- | -------- | ----------------------------------------------------------------- |
| array |      | yes      | The source array                                                  |
| mapFn |      | yes      | A function which returns a new value for each element of `array`. |

## max

> Compares all values in an array returning the highest element. Elements should be naturally comparable by the `>` operator.
```js
max(array)
```



### Parameters

| Name  | Type            | Required | Description                   |
| ----- | --------------- | -------- | ----------------------------- |
| array | [object Object] | yes      | Array to compare values from. |

## min

> Compares all values in an array returning the lowest element. Elements should be naturally comparable by the `<` operator.
```js
min(array)
```



### Parameters

| Name  | Type            | Required | Description                   |
| ----- | --------------- | -------- | ----------------------------- |
| array | [object Object] | yes      | Array to compare values from. |

## moveElement

> Returns a new array that is the result of removing the element at position `fromIndex` from `array`and placing it back into the copied array at position `toIndex`.
```js
moveElement(array, fromIndex, toIndex)
```



### Parameters

| Name      | Type | Required | Description                                      |
| --------- | ---- | -------- | ------------------------------------------------ |
| array     |      | yes      | The source array                                 |
| fromIndex |      | yes      | The index of the element to remove               |
| toIndex   |      | yes      | The index at which to insert the removed element |

## multiPartition

> Returns a multiple element array. Each array other than the last is the result of applying the filterFns, in order.The last returned array is any items that were not included in the other arrays.

WARNING: the provided `filterFns` may overlap. If this is not desired, it is up to the consuming application to ensure overlap does not happen.
```js
multiPartition(array, filterFns)
```



### Parameters

| Name      | Type | Required | Description                                          |
| --------- | ---- | -------- | ---------------------------------------------------- |
| array     |      | yes      | The source array to query against.                   |
| filterFns |      | yes      | A series of lambdas that describe elements to match. |

## notIntersect

> Returns a new array consisting of elements that exist only in `a` and only in `b`, but not in both `a` and `b`
```js
notIntersect(a, b)
```



### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| a    |      | yes      |             |
| b    |      | yes      |             |

## omit

> Returns a new array that is the result of removing `element` from `array`.! This may remove multiple elements if multiple matches are found.
```js
omit(array, element)
```



### Parameters

| Name    | Type | Required | Description                                  |
| ------- | ---- | -------- | -------------------------------------------- |
| array   |      | yes      | The source array                             |
| element |      | yes      | The element to omit from the resulting array |

## partition

> Returns a two element array. The first element is an array of items that match the provided query function, the secondis the items from the original array that do not match the function query.
```js
partition(array, filterFn)
```



### Parameters

| Name     | Type | Required | Description                                |
| -------- | ---- | -------- | ------------------------------------------ |
| array    |      | yes      | The source array to query against.         |
| filterFn |      | yes      | A lambda that describes elements to match. |

## pickEach

> Returns a new array of objects containing a subset of fields from an original array of objects.
```js
pickEach(array, fields)
```



### Parameters

| Name   | Type | Required | Description                                                                                                                                                                                 |
| ------ | ---- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| array  |      | yes      | The source array                                                                                                                                                                            |
| fields |      | yes      | A list of property names to keep from each object in `array`. If the array does not contain any of
                the expected elements, they will not exist in the resulting output array |

## preparedMap

> Prepares a reusable mapper which can run the same function on different sets of arrays using common arguments.
```js
preparedMap(mapFn)
```



### Parameters

| Name  | Type | Required | Description                                                                                                                                                                     |
| ----- | ---- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mapFn |      | yes      | A function which is ready to return a new value for each element of `array`.
              The processing from this function is deferred until the returned function is called. |

## prepend

> Concatenates an element on to the beginning of an array.Can be used as an immutable alternative to Array.prototype.unshift();
```js
prepend(array, element)
```



### Parameters

| Name    | Type | Required | Description                            |
| ------- | ---- | -------- | -------------------------------------- |
| array   |      | yes      | The original array                     |
| element |      | yes      | The element to append to the new array |

## prune

> Returns a new array which is the result of removing elements from `initialList` which are also in `pruneList`
```js
prune(initialList, pruneList)
```



### Parameters

| Name        | Type | Required | Description                                                                        |
| ----------- | ---- | -------- | ---------------------------------------------------------------------------------- |
| initialList |      | yes      | List to prune from. The source list is not affected. A new array will be returned. |
| pruneList   |      | yes      | List of elements to remove.                                                        |

## reduce

> Step over each element in `array`, building a new output object which is initialized as `init`.`fn` should return a new representation of the aggregate object after applying changes based
on an array element.
```js
reduce(array, fn, init)
```



### Parameters

| Name  | Type | Required | Description                                                                                                                                    |
| ----- | ---- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| array |      | yes      | An array to step over for source information                                                                                                   |
| fn    |      | yes      | A function to process each element in the array. It should return a new object that is the result of adding changes based on an array element. |
| init  |      | yes      | The initial value for the object being built by `fn`. Represents the initial state of the object.                                              |

## reduceRight

> Similar to `reduce()` but array elements are processed from last to first. (See `reduce()`)
```js
reduceRight()
```



## reject

> Alias for `whereNot()`
```js
reject()
```



## removeAt

> Returns a new array that is the result of removing the element at position `index` from `array`
```js
removeAt(array, index)
```



### Parameters

| Name  | Type | Required | Description                        |
| ----- | ---- | -------- | ---------------------------------- |
| array |      | yes      | The source array                   |
| index |      | yes      | The index of the element to remove |

## replaceAt

> Returns a new array that is the result of replacing the element at `index` in `array` with the new `element`
```js
replaceAt(array, element, index)
```



### Parameters

| Name    | Type | Required | Description                               |
| ------- | ---- | -------- | ----------------------------------------- |
| array   |      | yes      | The source array                          |
| element |      | yes      | The element to add to the resulting array |
| index   |      | yes      | Where to place the element                |

## reverse

> Returns a new array that is the result of reversing the order of the elements in `array`
```js
reverse()
```



## series

> Creates an array consisting of a series of sequential numbers.
```js
series(n, startAt)
```



### Parameters

| Name    | Type | Required | Description                           |
| ------- | ---- | -------- | ------------------------------------- |
| n       |      | yes      | How many elements to generate         |
| startAt |      | yes      | Which number to start at. (default 0) |

## slice

> Returns a section of an array.
```js
slice(array, start, end)
```



### Parameters

| Name  | Type | Required | Description                                                                                           |
| ----- | ---- | -------- | ----------------------------------------------------------------------------------------------------- |
| array |      | yes      | The array to source the section from.                                                                 |
| start |      | yes      | — The beginning of the specified portion of the array.                                                |
| end   |      | yes      | — The end of the specified portion of the array. This is exclusive of the element at the index 'end'. |

## slicePage

> Returns a section of an array using page size and number.
```js
slicePage(array, pageNumber, pageSize)
```



### Parameters

| Name       | Type | Required | Description                                         |
| ---------- | ---- | -------- | --------------------------------------------------- |
| array      |      | yes      | The array to source the section from.               |
| pageNumber |      | yes      | — The page to slice out.                            |
| pageSize   |      | yes      | — How many elements should represent a single page. |

## slicesOf

> Alias of `chunkArray`
```js
slicesOf()
```



## sort

> Returns a NEW array that has been sorted using `sortFn`. The original array is unaffected.
```js
sort(array, sortFn)
```



### Parameters

| Name   | Type | Required | Description                                                                                                                                                             |
| ------ | ---- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| array  |      | yes      | The array to sort                                                                                                                                                       |
| sortFn |      | yes      | A function used to sort. This function should return a negative value if
                a < b, zero for the same and a positive value if b > a (Ex: `(a, b) => a - b`) |

## sum

> Returns a sum of a provided field from the elements in `array`.
```js
sum(array, field)
```



### Parameters

| Name  | Type | Required | Description                                                                                                                             |
| ----- | ---- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| array |      | yes      | The source array                                                                                                                        |
| field |      | yes      | Which field to sum. If the value of any instance of this property in any element cannot be parsed to an Integer, the result will be NaN |

## sumWhere

> Returns a sum of a provided field matching a given condition from the elements in `array`.
```js
sumWhere(array, fn, sumField)
```



### Parameters

| Name     | Type | Required | Description                                                                                                                             |
| -------- | ---- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| array    |      | yes      | The source array                                                                                                                        |
| fn       |      | yes      | Function used to filter the source list.                                                                                                |
| sumField |      | yes      | Which field to sum. If the value of any instance of this property in any element cannot be parsed to an Integer, the result will be NaN |

## table

> Returns a hash from an array of objects where the key is the value of the provided field name.
```js
table(array, key)
```



### Parameters

| Name  | Type | Required | Description                              |
| ----- | ---- | -------- | ---------------------------------------- |
| array |      | yes      | The source array                         |
| key   |      | yes      | Which field to use as the ObjectHash key |

## tail

> Returns all elements other than the first element of an array
```js
tail()
```



## where

> Returns a new array of objects containing elements filtered from an original array of objectswhere the filter function returns `true`.
```js
where(array, filterFn)
```



### Parameters

| Name     | Type | Required | Description                              |
| -------- | ---- | -------- | ---------------------------------------- |
| array    |      | yes      | The source array                         |
| filterFn |      | yes      | Function used to filter the source list. |

## whereNot

> Returns a new array of objects containing elements filtered from an original array of objectswhere the filter function returns `false`.
```js
whereNot(array, filterFn)
```



### Parameters

| Name     | Type | Required | Description                              |
| -------- | ---- | -------- | ---------------------------------------- |
| array    |      | yes      | The source array                         |
| filterFn |      | yes      | Function used to filter the source list. |
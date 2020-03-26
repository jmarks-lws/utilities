# Utilities
A series of useful functions, heavily tested and strongly typed via Typescript declarations. Inspired by functional philosophies, but not claiming to be a functional library (yet, anyhow).

These functions are intended to simplify code in consuming applications by abstracting common code tasks and control structures into composable, mockable, "unit testable", declarative functions.

Some of these merely wrap common tasks with a declarative word or two to better describe what they do, others abstract more complex functionality. A few - like `branch` - wrap code structures in functions, which allows for some fun functional funny-business, like partial application and currying.

## Categories
  - Miscellaneous
  - Arrays
  - Objects
  - Functional Tools
  - Pipes

### Miscellaneous
  - def
  - undef
  - isNull
  - notNull
  - empty
  - notEmpty
  - boolVal
  - floatVal
  - intVal

### Arrays

*A series of simple functional array utilities.*
  - head
  - tail
  - copy
  - length
  - reverse
  - chopFirst
  - chopLast

*Abstractions of Array dot methods, with some additional typescript annotation.*
  - isArray
  - concat
  - reduce
  - reduceRight - Same as reduce, but works in reverse - from the last element of the array to the first.
  - slice
  - map
  - preparedMap - Partially applies an array mapping function, by loading it up with the function, returning a function that can be called with only the array afterward.

*List/Item manipulation methods:*
  - arrayWrap
  - prune
  - intersect
  - notIntersect
  - omit
  - insertAt
  - removeAt
  - pickEach - Applies an object 'pick' to each element of an array, assumes an array of Hashes
  - hash - Creates a new Hash by taking the same key from each array element and using it as the hash key.
  - compactArray - Removes null or undefined items from an array and returns the result.
  - flatten - Takes multidimensional arrays and flattens them out into fewer dimensions. By default will flatten to one dimension completely.

*Filtering methods:*
  - where
  - whereNot
  - partition
  - first - get the first element from an array - not very different from head.
  - findFirst - get the first element from an array that matches a condition
  - last - get the last element from an array
  - findLast - get the last element from an array that matches a condition

*Aggregation functions:*
  - count
  - countWhere
  - sum
  - sumWhere

*Assertions:*
  - hasAny
  - hasNone
  - hasAll

*types:*
  - FilterFn<T>
  - ReduceFn<T>

### Objects
  - keys
  - values
  - pick
  - pickNot
  - removeField
  - hasKey
  - mapKeys
  - compactObject
  - merge
  - mergeRight
  - getSharedKeys
  - mergeIntersection
  - diff
  - fullDiff
  - hasDiff
  - noDiff
  - pluck
  - remapKeys
  - invert

*types:*
  - Hash
  - HashOf<T>

### Functional Tools
  - identity
  - curry
  - partial
  - spreadArgs
  - reverseArgs
  - mapAsync
  - take(...).from(...)
  - branch
  - tryCatch
  - tryCatchManyAsync

*types:*
  - IMappableObject - ???? keep ????

### Pipes
  - pipe
  - asyncPipe

*types:*
  - IPipe
  - IPipeCaller<T>
  - IPipeAsync<T>
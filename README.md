# Utilities
A series of useful functions, heavily tested and strongly typed via Typescript declarations. Inspired by functional philosophies, but not claiming to be a functional library (yet, anyhow).

Each function in this library adheres to the rule that it will never change the data provided to it as input. It will always return a new value.

These functions are intended to simplify code in consuming applications by abstracting common code tasks and control structures into composable, mockable, "unit testable", declarative functions.

Some of these merely wrap common tasks with a declarative word or two to better describe what they do, others abstract more complex functionality. A few - like `branch` - wrap code structures in functions, which allows for some fun functional funny-business, like partial application and currying.

## Categories
  - Miscellaneous
  - Arrays
  - Objects
  - Functional Tools
  - Pipes

### Memoization
  - memoize

### Miscellaneous
  - def / isDef / isDefined
  - undef / notDef / isUndefined
  - isNull
  - notNull
  - empty
  - notEmpty
  - boolVal
  - floatVal
  - intVal
  - clamp
  - envToType
  - isBigInt
  - isBoolean
  - isBoolString
  - isIntegerNumber
  - isNumber
  - isNumeric
  - isPrimitive
  - isReference
  - isString
  - isSymbol
  - isValidJSON
  - isValidNumber
  - sameType
  - stringToBool
  - typeCast

*types:*
  - InvalidParameterError
  - NotUndefined
  - Nullable<T>
  - OneOrMany<T>
  - Optional<T>
  - RequireAtLeastOne<T, Keys extends keyof T = keyof T>
  - RequireOnlyOne<T, Keys extends keyof T = keyof T>

### Arrays

*A series of simple functional array utilities.*
  - arrayCopy
  - arrayEmpty
  - cloneArray
  - count
  - countWhere
  - deepCloneArray
  - deepMergeArrays
  - findFirst
  - findIndex
  - findLast
  - first
  - hasAll
  - hasAny
  - hasNone
  - hasAllDefined
  - hasNoneDefined
  - hasOneDefined
  - hasSomeDefined
  - includes
  - last
  - length
  - max
  - min
  - reverse
  - series

*Abstractions of Array dot methods, with some additional typescript annotation.*
  - concat
  - isArray
  - map
  - preparedMap - Partially applies an array mapping function, by loading it up with the function, returning a function that can be called with only the array afterward.
  - reduce
  - reduceRight - Same as reduce, but works in reverse - from the last element of the array to the first.
  - slice
  - slicePage

*List/Item manipulation methods:*
  - append
  - arrayWrap
  - compactArray - Removes null or undefined items from an array and returns the result.
  - chopFirst
  - chopLast
  - chunkArray / slicesOf
  - compactArray
  - concat
  - distinct
  - distinctObjects
  - distinctOn
  - distinctOnFields
  - dropFirst
  - dropLast
  - fieldSort
  - flatten - Takes multidimensional arrays and flattens them out into fewer dimensions. By default will flatten to one dimension completely.
  - flattenOnce - Takes multidimensional arrays and flattens them out by one dimension only.
  - group
  - head
  - insertAt
  - intersect
  - join
  - notIntersect
  - omit
  - partition
  - pickEach - Applies an object 'pick' to each element of an array, assumes an array of Hashes
  - preparedMap
  - prepend
  - prune
  - removeAt
  - replaceAt
  - reverse
  - sort
  - table / hash / hashTable / associative - Creates a new Hash by taking the same key from each array element and using it as the hash key.
  - tail

*Filtering methods:*
  - first - get the first element from an array - not very different from head.
  - findFirst - get the first element from an array that matches a condition
  - findLast - get the last element from an array that matches a condition
  - last - get the last element from an array
  - partition
  - where / filter
  - whereNot / reject

*Aggregation functions:*
  - count
  - countDefined
  - countWhere
  - sum
  - sumWhere

*Assertions:*
  - hasAll
  - hasAny
  - hasNone

*types:*
  - ArrayMergeMethod
  - ComparerFn<T>
  - EqualityFn<T>
  - FilterFn<T>
  - ReduceFn<T>

### Dates
  - utcYmdToDate

### Objects
  - addProp / addField
  - alterProp
  - arraysToObject
  - clone
  - compactObject
  - deepClone
  - deepMerge
  - diff
  - filterKeys
  - flattenObject
  - freeze
  - fullDiff
  - getSharedKeys
  - hasDiff
  - hasKey
  - identical
  - invert
  - isDefinedObject
  - iterate
  - iterateWithBreak
  - keyList
  - keys
  - mapKeys
  - merge
  - mergeIntersection
  - mergeRight
  - noDiff
  - pick
  - pickNot
  - pluck
  - prop
  - reduceObject
  - remapKeys
  - removeProp / removeField
  - transformKeys
  - transformValues
  - values
  - zip

*types:*
  - Augmented<T>
  - Constructor<T>
  - Hash
  - HashOf<T>
  - PartialOn<T, [...keys]>

### Functional Tools
  - argsAsArray
  - branch
  - curry
  - identity
  - isFunction
  - iterateAsync
  - mapAsync
  - mapAsyncSequential
  - maxOnce
  - maxTimes
  - partial
  - reduceAsyncSequential
  - repeat
  - repeatAsync
  - repeatAsyncWithBreak
  - repeatWithBreak
  - repeatWhile
  - repeatWhileAsync
  - reverseArgs
  - selectBranch
  - spreadArgs
  - take(...).from(...)
  - tryCatch
  - tryCatchManyAsync

*types:*
  - IMappableObject - ???? keep ????

### Logical
*operators:*
  - and
  - not
  - nand
  - or
  - nor
  - xor
*strict operators:*
  - strictNot
  - strictAnd
  - strictNand
  - strictOr
  - strictNor
  - scrictXor
*utilities:*
  - boolOrThrow

### Pipes
  - pipe
  - asyncPipe

*types:*
  - IPipe
  - IPipeCaller<T>
  - IPipeAsync<T>

### Strings
  - padLeft / padStart
  - padRight / padEnd
  - iEqual - case insensitive equality.
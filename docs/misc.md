# Miscellanous Helper Functions

Functions to use to write more declaritive semantic code.

## boolVal

> Returns `true` if `x` is "truthy" and `false` if `x` is "falsey".
```js
boolVal()
```



## clamp

> Returns the result of forcing `value` to be the nearest number between `minValue` and `maxValue`
```js
clamp(value, minValue, maxValue)
```



### Parameters

| Name     | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| value    |      | yes      |             |
| minValue |      | yes      |             |
| maxValue |      | yes      |             |

## def

> Returns true if `x` is not undefined. This will return true for `null`.
```js
def()
```



## empty

> Closely equivalent to PHP's rules for empty(). - Note: Treats both `undefined` and `null` as PHP's `null` for this method.
Returns true if x is undefined, null, 0, '' (empty string), '0', false, an empty array or an object with no keys.
```js
empty()
```



## envToType

> Attempts to convert a string environment variable to its appropriate JS data type. If it appears numeric, it will return a Number.If it appears to be a boolean string, it will return a boolean value. Otherwise it will return the provided string.
```js
envToType(env)
```



### Parameters

| Name | Type | Required | Description                                                                                                                       |
| ---- | ---- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| env  |      | yes      | The environment variable value to convert to its appropriate type. Use 'as <Type>' to provide relevant data type for application. |

## floatVal

> Returns a fractional numeric representation of an input value. This may return NaN
```js
floatVal()
```



## intVal

> Returns a non-fractional (integer) numeric representation of an input value. This may return NaN
```js
intVal()
```



## isBigInt

> Returns true if `x` is a `bigint`. Does not return true for `Number`.
```js
isBigInt()
```



## isBoolean

> Returns true if `x` is a `boolean`.
```js
isBoolean()
```



## isBoolString

> Determines whether the given string is either 'true' or 'false' (case insensitive).
```js
isBoolString(s)
```



### Parameters

| Name | Type | Required | Description    |
| ---- | ---- | -------- | -------------- |
| s    |      | yes      | String to test |

## isDef

> Alias for `def`
```js
isDef()
```



## isDefined

> Alias for `def`
```js
isDefined()
```



## isIntegerNumber

> Returns true if `x` is a `number` with no fractional data.
```js
isIntegerNumber()
```



## isNull

> Returns true if `x` is `null`
```js
isNull()
```



## isNumber

> Returns true if `x` is a `number`. NaN is considered a number and so will return `true`. Does not return true for `BigInt`.
```js
isNumber()
```



## isNumeric

> Returns true if `x` is a `number` or a string that can be successfully parsed to a `number` that is not `NaN`
```js
isNumeric()
```



## isPrimitive

> Convenience function. Returns true if the type of the provided value is a primitive type.
NOTE: `undefined` is a primitive value and will cause this function to return `true`
```js
isPrimitive()
```



## isReference

> Convenience function. Returns true if the type of the provided value is a reference type
```js
isReference()
```



## isString

> Returns true if `x` is a `string`.
```js
isString()
```



## isSymbol

> Returns true if `x` is a `symbol`.
```js
isSymbol()
```



## isUndefined

> Alias for `undef`
```js
isUndefined()
```



## isValidJSON

> Returns a boolean indicating whether the provided string value is valid JSON
```js
isValidJSON(value)
```



### Parameters

| Name  | Type | Required | Description                                |
| ----- | ---- | -------- | ------------------------------------------ |
| value |      | yes      | String value to test for valid JSON value. |

## isValidNumber

> Returns true if `x` is a `number` that is not NaN. Does not return true for `BigInt`.
```js
isValidNumber()
```



## notDef

> Alias for `undef`
```js
notDef()
```



## notEmpty

> Opposite of `empty()`.
```js
notEmpty()
```



## notNull

> Returns true if `x` is NOT `null`
```js
notNull()
```



## sameType

> 
```js
sameType()
```



## stringToBool

> Returns `true` if the provided string is the string 'true' (case insensitive), otherwise returns `false`.
```js
stringToBool(s)
```



### Parameters

| Name | Type | Required | Description                   |
| ---- | ---- | -------- | ----------------------------- |
| s    |      | yes      | String to convert to boolean. |

## stringToNumber

> Returns a numeric representation of an input string or `NaN` if the provided string value is not valid.The string should consist one or more digits, with zero or one decimal point (period) within the string.
If the string does not match this pattern, this function will return `NaN`.
```js
stringToNumber(str)
```



### Parameters

| Name | Type | Required | Description                                                             |
| ---- | ---- | -------- | ----------------------------------------------------------------------- |
| str  |      | yes      | String that should represent a number, with one optional decimal point. |

## strVal

> Returns an appropriate string value for `x`. If `x` is an array or object, this will be a JSONrepresentation. `null` and `undefined` will be converted to an empty string. Otherwise this will
return the result of built in .toString().
```js
strVal()
```



## typeCast

> Wrapper method for `input as T`
```js
typeCast(input)
```



### Parameters

| Name  | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| input |      | yes      |             |

## undef

> Returns true if `x` is undefined.
```js
undef()
```


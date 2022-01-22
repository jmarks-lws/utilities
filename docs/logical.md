# Logical Functions

## and

> Logical AND operation. Both values must be truthy
```js
and(a, b)
```



### Parameters

| Name | Type            | Required | Description |
| ---- | --------------- | -------- | ----------- |
| a    | [object Object] | yes      |             |
| b    | [object Object] | yes      |             |

## boolOrThrow

> Utility function internal to module.
```js
boolOrThrow(x)
```



### Parameters

| Name | Type            | Required | Description |
| ---- | --------------- | -------- | ----------- |
| x    | [object Object] | yes      |             |

## nand

> Logical NAND operation. At least one value is not truthy.
```js
nand(a, b)
```



### Parameters

| Name | Type            | Required | Description |
| ---- | --------------- | -------- | ----------- |
| a    | [object Object] | yes      |             |
| b    | [object Object] | yes      |             |

## nor

> Logical NOR operation. Neither value is truthy.
```js
nor(a, b)
```



### Parameters

| Name | Type            | Required | Description |
| ---- | --------------- | -------- | ----------- |
| a    | [object Object] | yes      |             |
| b    | [object Object] | yes      |             |

## not

> Logical NOT operation
```js
not(x)
```



### Parameters

| Name | Type            | Required | Description |
| ---- | --------------- | -------- | ----------- |
| x    | [object Object] | yes      |             |

## or

> Logical OR operation. At least one value is truthy.
```js
or(a, b)
```



### Parameters

| Name | Type            | Required | Description |
| ---- | --------------- | -------- | ----------- |
| a    | [object Object] | yes      |             |
| b    | [object Object] | yes      |             |

## strictAnd

> Strict logical AND operation. Both values must be truthy If all operands are not boolean type an error will be thrown.
```js
strictAnd(a, b)
```



### Parameters

| Name | Type            | Required | Description |
| ---- | --------------- | -------- | ----------- |
| a    | [object Object] | yes      |             |
| b    | [object Object] | yes      |             |

## strictNand

> Strict logical NAND operation. At least one value is not truthy. If all operands are not boolean type an error will be thrown.
```js
strictNand(a, b)
```



### Parameters

| Name | Type            | Required | Description |
| ---- | --------------- | -------- | ----------- |
| a    | [object Object] | yes      |             |
| b    | [object Object] | yes      |             |

## strictNor

> Strict logical NOR operation. Neither value is truthy. If all operands are not boolean type an error will be thrown.
```js
strictNor(a, b)
```



### Parameters

| Name | Type            | Required | Description |
| ---- | --------------- | -------- | ----------- |
| a    | [object Object] | yes      |             |
| b    | [object Object] | yes      |             |

## strictNot

> Strict logical NOT operation If all operands are not boolean type an error will be thrown.
```js
strictNot(x)
```



### Parameters

| Name | Type            | Required | Description |
| ---- | --------------- | -------- | ----------- |
| x    | [object Object] | yes      |             |

## strictOr

> Strict logical OR operation. At least one value is truthy. If all operands are not boolean type an error will be thrown.
```js
strictOr(a, b)
```



### Parameters

| Name | Type            | Required | Description |
| ---- | --------------- | -------- | ----------- |
| a    | [object Object] | yes      |             |
| b    | [object Object] | yes      |             |

## strictXor

> Strict logical XOR operation. One and only one value is truthy. If all operands are not boolean type an error will be thrown.
```js
strictXor(a, b)
```



### Parameters

| Name | Type            | Required | Description |
| ---- | --------------- | -------- | ----------- |
| a    | [object Object] | yes      |             |
| b    | [object Object] | yes      |             |

## xor

> Logical XOR operation. One and only one value is truthy.
```js
xor(a, b)
```



### Parameters

| Name | Type            | Required | Description |
| ---- | --------------- | -------- | ----------- |
| a    | [object Object] | yes      |             |
| b    | [object Object] | yes      |             |
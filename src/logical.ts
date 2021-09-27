import { isBoolean } from './miscellaneous';

/**
 * Logical NOT operation
 * @param {boolean} x
 */
export const not = (x: boolean) => !x;
/**
 * Logical AND operation. Both values must be truthy
 * @param {boolean} a
 * @param {boolean} b
 */
export const and = (a: boolean, b: boolean) => !!a && !!b;
/**
 * Logical NAND operation. At least one value is not truthy.
 * @param {boolean} a
 * @param {boolean} b
 */
export const nand = (a: boolean, b: boolean) => not(and(!!a, !!b)); // at least one is not true
/**
 * Logical OR operation. At least one value is truthy.
 * @param {boolean} a
 * @param {boolean} b
 */
export const or = (a: boolean, b: boolean) => !!a || !!b;
/**
 * Logical NOR operation. Neither value is truthy.
 * @param {boolean} a
 * @param {boolean} b
 */
export const nor = (a: boolean, b: boolean) => not(or(a, b));
/**
 * Logical XOR operation. One and only one value is truthy.
 * @param {boolean} a
 * @param {boolean} b
 */
export const xor = (a: boolean, b: boolean) => or(a, b) && or(not(a), not(b)); // Only one is true


/**
 * Utility function internal to module.
 * @param {unknown} x
 */
const boolOrThrow = (x: unknown) => {
  if (!isBoolean(x)) throw new Error('Invalid operand. Must be boolean.');
  return x;
};

/**
 * Strict logical NOT operation If all operands are not boolean type an error will be thrown.
 * @param {boolean} x
 */
export const strictNot = (x: boolean) => !boolOrThrow(x); // logical NOT
/**
 * Strict logical AND operation. Both values must be truthy If all operands are not boolean type an error will be thrown.
 * @param {boolean} a
 * @param {boolean} b
 */
export const strictAnd = (a: boolean, b: boolean) => boolOrThrow(a) && boolOrThrow(b); // both are true
/**
 * Strict logical NAND operation. At least one value is not truthy. If all operands are not boolean type an error will be thrown.
 * @param {boolean} a
 * @param {boolean} b
 */
export const strictNand = (a: boolean, b: boolean) => strictNot(strictAnd(a, b)); // at least one is not true
/**
 * Strict logical OR operation. At least one value is truthy. If all operands are not boolean type an error will be thrown.
 * @param {boolean} a
 * @param {boolean} b
 */
export const strictOr = (a: boolean, b: boolean) => boolOrThrow(a) || boolOrThrow(b); // at least one is true
/**
 * Strict logical NOR operation. Neither value is truthy. If all operands are not boolean type an error will be thrown.
 * @param {boolean} a
 * @param {boolean} b
 */
export const strictNor = (a: boolean, b: boolean) => strictNot(strictOr(a, b)); // Neither is true
/**
 * Strict logical XOR operation. One and only one value is truthy. If all operands are not boolean type an error will be thrown.
 * @param {boolean} a
 * @param {boolean} b
 */
export const strictXor = (a: boolean, b: boolean) => strictOr(a, b) && strictOr(strictNot(a), strictNot(b)); // Only one is true

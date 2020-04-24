import {
  not, and, nand, or, nor, xor, strictNot, strictXor, strictNor, strictOr, strictNand, strictAnd,
} from '../src';

/** Typescript workaround to provide non-boolean data as a boolean */
const asBool = (x: any) => x as boolean;

describe('Logical functions', () => {
  test('not', async () => {
    expect(not(asBool('a'))).toBe(false);
  });
  test('and', async () => {
    expect(and(asBool('a'), asBool('b'))).toBe(true);
    expect(and(asBool('a'), asBool(''))).toBe(false);
    expect(and(asBool(''), asBool('a'))).toBe(false);
    expect(and(asBool(''), asBool(''))).toBe(false);
    expect(and(asBool(1), asBool(1))).toBe(true);
    expect(and(asBool(1), asBool(0))).toBe(false);
    expect(and(asBool(0), asBool(1))).toBe(false);
    expect(and(asBool(0), asBool(0))).toBe(false);
    expect(and(true, true)).toBe(true);
    expect(and(true, false)).toBe(false);
    expect(and(false, true)).toBe(false);
    expect(and(false, false)).toBe(false);
  });
  test('nand', async () => {
    expect(nand(asBool('a'), asBool('b'))).toBe(false);
    expect(nand(asBool('a'), asBool(''))).toBe(true);
    expect(nand(asBool(''), asBool('a'))).toBe(true);
    expect(nand(asBool(''), asBool(''))).toBe(true);
    expect(nand(asBool(1), asBool(1))).toBe(false);
    expect(nand(asBool(1), asBool(0))).toBe(true);
    expect(nand(asBool(0), asBool(1))).toBe(true);
    expect(nand(asBool(0), asBool(0))).toBe(true);
    expect(nand(true, true)).toBe(false);
    expect(nand(true, false)).toBe(true);
    expect(nand(false, true)).toBe(true);
    expect(nand(false, false)).toBe(true);
  });
  test('or', async () => {
    expect(or(asBool('a'), asBool('b'))).toBe(true);
    expect(or(asBool('a'), asBool(''))).toBe(true);
    expect(or(asBool(''), asBool('a'))).toBe(true);
    expect(or(asBool(''), asBool(''))).toBe(false);
    expect(or(asBool(1), asBool(1))).toBe(true);
    expect(or(asBool(1), asBool(0))).toBe(true);
    expect(or(asBool(0), asBool(1))).toBe(true);
    expect(or(asBool(0), asBool(0))).toBe(false);
    expect(or(true, true)).toBe(true);
    expect(or(true, false)).toBe(true);
    expect(or(false, true)).toBe(true);
    expect(or(false, false)).toBe(false);
  });
  test('nor', async () => {
    expect(nor(asBool('a'), asBool('b'))).toBe(false);
    expect(nor(asBool('a'), asBool(''))).toBe(false);
    expect(nor(asBool(''), asBool('a'))).toBe(false);
    expect(nor(asBool(''), asBool(''))).toBe(true);
    expect(nor(asBool(1), asBool(1))).toBe(false);
    expect(nor(asBool(1), asBool(0))).toBe(false);
    expect(nor(asBool(0), asBool(1))).toBe(false);
    expect(nor(asBool(0), asBool(0))).toBe(true);
    expect(nor(true, true)).toBe(false);
    expect(nor(true, false)).toBe(false);
    expect(nor(false, true)).toBe(false);
    expect(nor(false, false)).toBe(true);
  });
  test('xor', async () => {
    expect(xor(asBool('a'), asBool('b'))).toBe(false);
    expect(xor(asBool('a'), asBool(''))).toBe(true);
    expect(xor(asBool(''), asBool('a'))).toBe(true);
    expect(xor(asBool(''), asBool(''))).toBe(false);
    expect(xor(asBool(1), asBool(1))).toBe(false);
    expect(xor(asBool(1), asBool(0))).toBe(true);
    expect(xor(asBool(0), asBool(1))).toBe(true);
    expect(xor(asBool(0), asBool(0))).toBe(false);
    expect(xor(true, true)).toBe(false);
    expect(xor(true, false)).toBe(true);
    expect(xor(false, true)).toBe(true);
    expect(xor(false, false)).toBe(false);
  });
  // =====================
  test('strictNot', async () => {
    expect(() => strictNot(asBool('a'))).toThrow();
    expect(strictNot(true)).toBe(false);
  });
  test('strictAnd', async () => {
    expect(() => strictAnd(asBool('a'), asBool('b'))).toThrow();
    expect(() => strictAnd(asBool('a'), asBool(''))).toThrow();
    expect(() => strictAnd(asBool(''), asBool('a'))).toThrow();
    expect(() => strictAnd(asBool(''), asBool(''))).toThrow();
    expect(() => strictAnd(asBool(1), asBool(1))).toThrow();
    expect(() => strictAnd(asBool(1), asBool(0))).toThrow();
    expect(() => strictAnd(asBool(0), asBool(1))).toThrow();
    expect(() => strictAnd(asBool(0), asBool(0))).toThrow();
    expect(strictAnd(true, true)).toBe(true);
    expect(strictAnd(true, false)).toBe(false);
    expect(strictAnd(false, true)).toBe(false);
    expect(strictAnd(false, false)).toBe(false);
  });
  test('strictNand', async () => {
    expect(() => strictNand(asBool('a'), asBool('b'))).toThrow();
    expect(() => strictNand(asBool('a'), asBool(''))).toThrow();
    expect(() => strictNand(asBool(''), asBool('a'))).toThrow();
    expect(() => strictNand(asBool(''), asBool(''))).toThrow();
    expect(() => strictNand(asBool(1), asBool(1))).toThrow();
    expect(() => strictNand(asBool(1), asBool(0))).toThrow();
    expect(() => strictNand(asBool(0), asBool(1))).toThrow();
    expect(() => strictNand(asBool(0), asBool(0))).toThrow();
    expect(strictNand(true, true)).toBe(false);
    expect(strictNand(true, false)).toBe(true);
    expect(strictNand(false, true)).toBe(true);
    expect(strictNand(false, false)).toBe(true);
  });
  test('strictOr', async () => {
    expect(() => strictOr(asBool('a'), asBool('b'))).toThrow();
    expect(() => strictOr(asBool('a'), asBool(''))).toThrow();
    expect(() => strictOr(asBool(''), asBool('a'))).toThrow();
    expect(() => strictOr(asBool(''), asBool(''))).toThrow();
    expect(() => strictOr(asBool(1), asBool(1))).toThrow();
    expect(() => strictOr(asBool(1), asBool(0))).toThrow();
    expect(() => strictOr(asBool(0), asBool(1))).toThrow();
    expect(() => strictOr(asBool(0), asBool(0))).toThrow();
    expect(strictOr(true, true)).toBe(true);
    expect(strictOr(true, false)).toBe(true);
    expect(strictOr(false, true)).toBe(true);
    expect(strictOr(false, false)).toBe(false);
  });
  test('strictNor', async () => {
    expect(() => strictNor(asBool('a'), asBool('b'))).toThrow();
    expect(() => strictNor(asBool('a'), asBool(''))).toThrow();
    expect(() => strictNor(asBool(''), asBool('a'))).toThrow();
    expect(() => strictNor(asBool(''), asBool(''))).toThrow();
    expect(() => strictNor(asBool(1), asBool(1))).toThrow();
    expect(() => strictNor(asBool(1), asBool(0))).toThrow();
    expect(() => strictNor(asBool(0), asBool(1))).toThrow();
    expect(() => strictNor(asBool(0), asBool(0))).toThrow();
    expect(strictNor(true, true)).toBe(false);
    expect(strictNor(true, false)).toBe(false);
    expect(strictNor(false, true)).toBe(false);
    expect(strictNor(false, false)).toBe(true);
  });
  test('strictXor', async () => {
    expect(() => strictXor(asBool('a'), asBool('b'))).toThrow();
    expect(() => strictXor(asBool('a'), asBool(''))).toThrow();
    expect(() => strictXor(asBool(''), asBool('a'))).toThrow();
    expect(() => strictXor(asBool(''), asBool(''))).toThrow();
    expect(() => strictXor(asBool(1), asBool(1))).toThrow();
    expect(() => strictXor(asBool(1), asBool(0))).toThrow();
    expect(() => strictXor(asBool(0), asBool(1))).toThrow();
    expect(() => strictXor(asBool(0), asBool(0))).toThrow();
    expect(strictXor(true, true)).toBe(false);
    expect(strictXor(true, false)).toBe(true);
    expect(strictXor(false, true)).toBe(true);
    expect(strictXor(false, false)).toBe(false);
  });
});

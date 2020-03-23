import { isNull } from 'util';
import {
  notNull, empty, notEmpty, boolVal, floatVal, strVal,
} from '../src/miscellaneous';

describe('Miscellaneous functions', () => {
  test('isNull', async () => {
    expect.assertions(3);
    expect(isNull('a')).toBe(false);
    expect(isNull(undefined)).toBe(false);
    expect(isNull(null)).toBe(true);
  });
  test('notNull', async () => {
    expect.assertions(3);
    expect(notNull('a')).toBe(true);
    expect(notNull(undefined)).toBe(true);
    expect(notNull(null)).toBe(false);
  });
  test('empty', async () => {
    expect.assertions(12);
    expect(empty([])).toBe(true);
    expect(empty([1])).toBe(false);
    expect(empty(0)).toBe(true);
    expect(empty(-1)).toBe(false);
    expect(empty('0')).toBe(true);
    expect(empty('1')).toBe(false);
    expect(empty(false)).toBe(true);
    expect(empty(true)).toBe(false);
    expect(empty('')).toBe(true);
    expect(empty('  ')).toBe(false);
    expect(empty(undefined)).toBe(true);
    expect(empty(null)).toBe(true);
  })
  test('notEmpty', async () => {
    expect.assertions(12);
    expect(notEmpty([])).toBe(false);
    expect(notEmpty([1])).toBe(true);
    expect(notEmpty(0)).toBe(false);
    expect(notEmpty(-1)).toBe(true);
    expect(notEmpty('0')).toBe(false);
    expect(notEmpty('1')).toBe(true);
    expect(notEmpty(false)).toBe(false);
    expect(notEmpty(true)).toBe(true);
    expect(notEmpty('')).toBe(false);
    expect(notEmpty('  ')).toBe(true);
    expect(notEmpty(undefined)).toBe(false);
    expect(notEmpty(null)).toBe(false);
  });
  test('boolVal', async () => {
    expect(boolVal('a')).toBe(true);
    expect(boolVal('')).toBe(false);
  })
  test('floatVal', async () => {
    expect(floatVal('123')).toBe(123);
    expect(floatVal('aaa')).toBeNaN();
  });
  test('strVal', async () => {
    expect(strVal([1, 2, 3])).toBe(JSON.stringify([1, 2, 3]));
    expect(strVal({ a: 1, b: 2, c: 3 })).toBe(JSON.stringify({ a: 1, b: 2, c: 3 }));
  });
});

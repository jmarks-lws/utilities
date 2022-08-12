import {
  isNull, notNull, empty, notEmpty, boolVal, floatVal, strVal, isValidNumber,
  isIntegerNumber, isNumeric, isString, isBigInt, isSymbol, isBoolean,
  isPrimitive, isReference, envToType, intVal, sameType, isValidJSON,
  typeCast, clamp, stringToNumber,
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
    expect.assertions(13);
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
    expect(empty({})).toBe(true);
  });
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
  });
  test('floatVal', async () => {
    expect(floatVal('123')).toBe(123);
    expect(floatVal(123)).toBe(123);
    expect(floatVal('aaa')).toBeNaN();
    expect(floatVal(undefined)).toBeNaN();
  });
  test('stringToNumber', async () => {
    expect(stringToNumber('123')).toBe(123);
    expect(stringToNumber('0')).toBe(0);
    expect(stringToNumber('0.0')).toBe(0);
    expect(stringToNumber('.123')).toBe(0.123);
    expect(stringToNumber('123.')).toBe(123);
    expect(stringToNumber('12.3')).toBe(12.3);
    expect(stringToNumber('00001')).toBe(1);
    expect(stringToNumber('000.1')).toBe(0.1);
    expect(stringToNumber('123 ')).toBeNaN();
    expect(stringToNumber(' 123')).toBeNaN();
    expect(stringToNumber('12 3')).toBeNaN();
    expect(stringToNumber('10e3')).toBeNaN();
    expect(stringToNumber('a123')).toBeNaN();
    expect(stringToNumber('123z')).toBeNaN();
    expect(stringToNumber('1.23.')).toBeNaN();
    expect(stringToNumber('..123')).toBeNaN();
    expect(stringToNumber('123..')).toBeNaN();
    expect(stringToNumber('$123')).toBeNaN();
    expect(stringToNumber('0x101')).toBeNaN();
    expect(stringToNumber('0b101')).toBeNaN();
  });
  test('strVal', async () => {
    expect(strVal([1, 2, 3])).toBe(JSON.stringify([1, 2, 3]));
    expect(strVal({ a: 1, b: 2, c: 3 })).toBe(JSON.stringify({ a: 1, b: 2, c: 3 }));
    expect(strVal(undefined)).toBe('');
    expect(strVal(null)).toBe('');
  });
  test('intVal', async () => {
    expect(intVal([1, 2, 3])).toBe(1);
    expect(intVal({ a: 1, b: 2, c: 3 })).toBe(NaN);
    expect(intVal(undefined)).toBe(NaN);
    expect(intVal(null)).toBe(NaN);
    expect(intVal(1.3)).toBe(1);
    expect(intVal(25)).toBe(25);
    expect(intVal('153')).toBe(153);
  });
  test('isValidNumber returns correctly', async () => {
    expect(isValidNumber(12)).toBe(true);
    expect(isValidNumber(0.712)).toBe(true);
    expect(isValidNumber('abc')).toBe(false);
    expect(isValidNumber(NaN)).toBe(false);
    expect(isValidNumber('123')).toBe(false);
    expect(isValidNumber(BigInt(123))).toBe(false);
    expect(isValidNumber(true)).toBe(false);
    expect(isValidNumber(false)).toBe(false);
  });
  test('isValidJSON returns correctly', async () => {
    expect(isValidJSON(JSON.stringify({}))).toBe(true);
    expect(isValidJSON('asdfasdf null fun')).toBe(false);
  });
  test('isIntegerNumber returns correctly', async () => {
    expect(isIntegerNumber(12)).toBe(true);
    expect(isIntegerNumber(0.712)).toBe(false);
    expect(isIntegerNumber('abc')).toBe(false);
    expect(isIntegerNumber(NaN)).toBe(false);
    expect(isIntegerNumber('123')).toBe(false);
    expect(isIntegerNumber(true)).toBe(false);
    expect(isIntegerNumber(false)).toBe(false);
  });
  test('isNumeric returns correctly', async () => {
    expect(isNumeric(12)).toBe(true);
    expect(isNumeric(0.712)).toBe(true);
    expect(isNumeric('abc')).toBe(false);
    expect(isNumeric(NaN)).toBe(false);
    expect(isNumeric('123')).toBe(true);
    expect(isNumeric(true)).toBe(false);
    expect(isNumeric(false)).toBe(false);
  });
  test('isString returns correctly', async () => {
    expect(isString(12)).toBe(false);
    expect(isString(0.712)).toBe(false);
    expect(isString('abc')).toBe(true);
    expect(isString(NaN)).toBe(false);
    expect(isString('123')).toBe(true);
    expect(isString(true)).toBe(false);
    expect(isString(false)).toBe(false);
  });
  test('isBigInt returns correctly', async () => {
    expect(isBigInt(12)).toBe(false);
    expect(isBigInt(0.712)).toBe(false);
    expect(isBigInt('abc')).toBe(false);
    expect(isBigInt(NaN)).toBe(false);
    expect(isBigInt('123')).toBe(false);
    expect(isBigInt(BigInt(123))).toBe(true);
    expect(isBigInt(true)).toBe(false);
    expect(isBigInt(false)).toBe(false);
  });
  test('isSymbol returns correctly', async () => {
    expect(isSymbol(12)).toBe(false);
    expect(isSymbol(0.712)).toBe(false);
    expect(isSymbol('abc')).toBe(false);
    expect(isSymbol(NaN)).toBe(false);
    expect(isSymbol('123')).toBe(false);
    expect(isSymbol(BigInt(123))).toBe(false);
    expect(isSymbol(true)).toBe(false);
    expect(isSymbol(false)).toBe(false);
  });
  test('isBoolean returns correctly', async () => {
    expect(isBoolean(12)).toBe(false);
    expect(isBoolean(0.712)).toBe(false);
    expect(isBoolean('abc')).toBe(false);
    expect(isBoolean(NaN)).toBe(false);
    expect(isBoolean('123')).toBe(false);
    expect(isBoolean(BigInt(123))).toBe(false);
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });
  test('isPrimitive returns correctly', async () => {
    expect(isPrimitive(12)).toBe(true);
    expect(isPrimitive(0.712)).toBe(true);
    expect(isPrimitive('abc')).toBe(true);
    expect(isPrimitive(NaN)).toBe(true);
    expect(isPrimitive('123')).toBe(true);
    expect(isPrimitive(BigInt(123))).toBe(true);
    expect(isPrimitive(true)).toBe(true);
    expect(isPrimitive(false)).toBe(true);
    expect(isPrimitive({})).toBe(false);
    expect(isPrimitive([])).toBe(false);
    expect(isPrimitive(new Date())).toBe(false);
  });
  test('isReference returns correctly', async () => {
    expect(isReference(12)).toBe(false);
    expect(isReference(0.712)).toBe(false);
    expect(isReference('abc')).toBe(false);
    expect(isReference(NaN)).toBe(false);
    expect(isReference('123')).toBe(false);
    expect(isReference(BigInt(123))).toBe(false);
    expect(isReference(true)).toBe(false);
    expect(isReference(false)).toBe(false);
    expect(isReference({})).toBe(true);
    expect(isReference([])).toBe(true);
    expect(isReference(new Date())).toBe(true);
  });

  test('sameType', async () => {
    expect(sameType(1, 1)).toBe(true);
    expect(sameType(1, '1')).toBe(false);
    expect(sameType('1', '1')).toBe(true);
    expect(sameType(true, true)).toBe(true);
    expect(sameType(false, false)).toBe(true);
    expect(sameType(true, false)).toBe(true);
  });

  test('envToType returns correctly', async () => {
    expect(envToType('ABC')).toBe('ABC');
    expect(envToType('123')).toBe(123);
    expect(envToType('123.321')).toBe(123.321);
    expect(envToType('false')).toBe(false);
    expect(envToType('FALSE')).toBe(false);
    expect(envToType('true')).toBe(true);
    expect(envToType('TRUE')).toBe(true);
  });
  test('typeCast input is still output value', async () => {
    const a: any = 'a';
    expect(a).toBe(typeCast<string>(a));
  });
  test('clamp', async () => {
    const a = 12;
    expect(clamp(a, 1, 10)).toBe(10);
    expect(clamp(a, 15, 25)).toBe(15);
    expect(clamp(a, 1, 20)).toBe(12);
    expect(clamp(a, 10, 12)).toBe(12);
    expect(clamp(a, 12, 20)).toBe(12);
  });
});

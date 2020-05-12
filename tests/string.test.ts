import { padLeft, padRight, iEqual } from '../src/string';

describe('string functions', () => {
  // TODO: test that strings are not chopped if more than the desired number of characters are in original string
  test('padLeft', async () => {
    expect(padLeft('7', 3, '0')).toBe('007');
    expect(padLeft('7', 3)).toBe('  7');
  });
  test('padRight', async () => {
    expect(padRight('7', 3, '0')).toBe('700');
    expect(padRight('7', 3)).toBe('7  ');
  });
  test('padding both', async () => {
    expect(padRight(padLeft('7', 3, '0'), 5, '0')).toBe('00700');
  });
  test('iEqual', async () => {
    expect(iEqual('abc', 'ABC')).toBe(true);
    expect(iEqual('abc', 'Abc')).toBe(true);
    expect(iEqual('ABC', 'ABC')).toBe(true);
    expect(iEqual('ABC', 'abc')).toBe(true);
    expect(iEqual('abc', ' ABC')).toBe(false);
  });
});

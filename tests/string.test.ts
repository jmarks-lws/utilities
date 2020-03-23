import { padLeft, padRight } from '../src/string';

describe('string functions', () => {
  test('padLeft', async () => {
    expect(padLeft('7', 3, '0')).toBe('007');
  })
  test('padRight', async () => {
    expect(padRight('7', 3, '0')).toBe('700');
  })
  test('padding both', async () => {
    expect(padRight(padLeft('7', 3, '0'), 5, '0')).toBe('00700');
  })
})

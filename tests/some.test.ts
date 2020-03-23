import { chopFirst, chopLast, where } from '../src/array'

describe('quicker tests', () => {
  test('where', async () => {
    const result = where([1, 2, 3, 4, 5, 6], (a) => a < 3);
    expect(result).toMatchObject([1, 2])
  })
})

import { Hash, memoize } from '../src';

const data: Hash = {};
const cacher = {
  get: (name: string) => data[name],
  set: (name: string, value: any) => { data[name] = value },
}

describe('memoize', () => {
  test('memoize without a cache proxy', async () => {
    const basic = memoize((prop: string) => ({ hello: 'world' }));
    const a = basic('w/e');
    const b = basic('w/e');
    expect(a).toBe(b);
    expect(a).not.toBe({ hello: 'world' })
    expect(b).not.toBe({ hello: 'world' })
  });
  test('memoize with an object param', async () => {
    const basic = memoize((prop: Hash) => ({ hello: 'world' }));
    const obj = { value: 'w/e' };
    const a = basic(obj);
    const b = basic(obj);
    expect(a).toBe(b);
    expect(a).not.toBe({ hello: 'world' })
    expect(b).not.toBe({ hello: 'world' })
  });
  test('memoize *with* a cache proxy', async () => {
    const cached = memoize(() => ({ hello: 'world' }), cacher);
    const a = cached();
    const b = cached();
    expect(a).toBe(b);
    expect(a).not.toBe({ hello: 'world' })
    expect(b).not.toBe({ hello: 'world' })
  });
});

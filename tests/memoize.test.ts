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
  test('caches falsy return values without re-invoking (no cache proxy)', async () => {
    let calls = 0;
    const falsy = memoize((prop: string) => { calls++; return 0; });
    expect(falsy('w/e')).toBe(0);
    expect(falsy('w/e')).toBe(0);
    expect(falsy('w/e')).toBe(0);
    expect(calls).toBe(1);
  });
  test('caches falsy return values without re-invoking (with cache proxy)', async () => {
    const data2: Hash = {};
    const cacher2 = {
      get: (name: string) => data2[name],
      set: (name: string, value: any) => { data2[name] = value },
    };
    let calls = 0;
    const falsy = memoize((prop: string) => { calls++; return false; }, cacher2);
    expect(falsy('w/e')).toBe(false);
    expect(falsy('w/e')).toBe(false);
    expect(falsy('w/e')).toBe(false);
    expect(calls).toBe(1);
  });
  test('memoize with an object param (with cache proxy)', async () => {
    const data2: Hash = {};
    const cacher2 = {
      get: (name: string) => data2[name],
      set: (name: string, value: any) => { data2[name] = value },
    };
    let calls = 0;
    const basic = memoize((prop: Hash) => { calls++; return { hello: 'world' }; }, cacher2);
    const obj = { value: 'w/e' };
    const a = basic(obj);
    const b = basic(obj);
    expect(a).toBe(b);
    expect(calls).toBe(1);
    expect(a).not.toBe({ hello: 'world' })
    expect(b).not.toBe({ hello: 'world' })
  });
  test('re-invokes after a rejected promise (no cache proxy)', async () => {
    let calls = 0;
    const flaky = memoize((prop: string) => {
      calls++;
      if (calls === 1) return Promise.reject(new Error('boom'));
      return Promise.resolve('ok');
    });
    await expect(flaky('w/e')).rejects.toThrow('boom');
    await expect(flaky('w/e')).resolves.toBe('ok');
    await expect(flaky('w/e')).resolves.toBe('ok');
    expect(calls).toBe(2);
  });
  test('re-invokes after a rejected promise (with cache proxy)', async () => {
    const data2: Hash = {};
    const cacher2 = {
      get: (name: string) => data2[name],
      set: (name: string, value: any) => { data2[name] = value },
    };
    let calls = 0;
    const flaky = memoize((prop: string) => {
      calls++;
      if (calls === 1) return Promise.reject(new Error('boom'));
      return Promise.resolve('ok');
    }, cacher2);
    await expect(flaky('w/e')).rejects.toThrow('boom');
    await expect(flaky('w/e')).resolves.toBe('ok');
    await expect(flaky('w/e')).resolves.toBe('ok');
    expect(calls).toBe(2);
  });
});

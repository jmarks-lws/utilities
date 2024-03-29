// eslint-disable-next-line max-classes-per-file
import {
  pick,
  compactObject,
  merge,
  getSharedKeys,
  remapKeys,
  iterateWithBreak,
  keys,
  Hash,
  iterate,
  values,
  isDefinedObject,
  pickNot,
  removeProp,
  mapKeys,
  mergeRight,
  mergeIntersection,
  pluck,
  invert,
  HashOf,
  prop,
  zip,
  arraysToObject,
  transformKeys,
  transformValues,
  hasDiff,
  noDiff,
  diff,
  fullDiff,
  clone,
  deepClone,
  keyList,
  deepMerge,
  filterKeys,
  alterProp,
  flattenObject,
  reduceObject,
  immutable,
} from '../src/object';
import { tail } from '../src/array';

describe('Object utilities tests', () => {
  const testPerson1 = {
    id: 123,
    name: 'Forest',
    age: undefined,
    favColor: '#FF0000',
    dob: '1980-01-07',
    weight: 220,
    height: 6.25,
  } as Hash;

  test('alterProp', () => {
    const result = alterProp(testPerson1, 'name', (name) => name.toUpperCase());
    expect(result.name).toBe('FOREST');
    expect(result).toMatchObject({
      ...testPerson1,
      name: 'FOREST',
    });
  });

  test('flattenObject', async () => {
    const obj = {
      a: 1, b: 2, c: { d: 3, e: 4, f: 5, g: { h: 6 } },
    };
    const result = flattenObject(obj);
    expect(result).toMatchObject({
      a: 1, b: 2, d: 3, e: 4, f: 5, h: 6,
    });
  });

  test('reduceObject', async () => {
    const obj = {
      a: 1, b: 2, c: 3,
    };
    const result = reduceObject(obj, (acc, key, entry) => entry + acc, 0);
    expect(result).toBe(6);
  });

  test('iterate can be short circiuted', () => {
    let runs = 0;
    const out: Hash = {};

    const fn = (key: string, val: any, done: CallableFunction) => {
      runs += 1;
      out[key] = val;
      if (runs === 3) {
        done();
      }
    };

    iterateWithBreak(testPerson1, fn);

    expect(keys(out).length).toBe(3);
  });

  test('iterate can loop over an everyday array', async () => {
    const input: Array<number> = [1, 2, 3, 4, 5];
    const out: Hash = {};
    iterate(input, (k, v) => { out[k] = v; });
    expect(out).toMatchObject({
      0: 1, 1: 2, 2: 3, 3: 4, 4: 5,
    });
    expect(input).toMatchObject(values(out));
  });

  test('iterate can loop over a hash effectively: ', async () => {
    const input: HashOf<number> = {
      a: 1, b: 2, c: 3, d: 4, e: 5,
    };
    const outKeys: string[] = [];
    let out = 0;
    iterate(input, (k: string, v: number) => { out += v; outKeys.push(k); });
    expect(out).toBe(1 + 2 + 3 + 4 + 5);
    expect(outKeys).toMatchObject(['a', 'b', 'c', 'd', 'e']);
  });

  test('keyList gets all keys', async () => {
    const o = {
      a: 1, c: 2, d: 3, b: 2,
    };
    const k = keyList(o);
    expect(k).toMatchObject(['a', 'c', 'd', 'b' ]);
    expect(k.sort()).toMatchObject(['a', 'b', 'c', 'd'].sort());
  });

  test('iterate doesn\'t cause errors for empty input: ', async () => {
    const out = iterate(null as any, (k: string, v: number) => v);
    expect(out).toMatchObject([]);
  });

  test('pick correctly picks a subset', () => {
    expect(pick(testPerson1, ['id', 'name'])).toMatchObject({
      id: 123,
      name: 'Forest',
    });
  });

  test('pick doesn\'t care if a field doesn\'t exist', () => {
    expect(pick(testPerson1, ['id', 'name', 'blah', 'foo', 'bar']))
      .toMatchObject({
        id: 123,
        name: 'Forest',
      });
  });

  test('prop', async () => {
    const p = prop({ a: 1, p: 23 }, 'p');
    const ba = prop({ a: 1, p: 23, c: 34 } as Hash, 'b');
    const bb = prop({ a: 1, p: 23, c: 34 } as Hash, 'b', 'test');
    expect(p).toBe(23);
    expect(ba).toBe(null);
    expect(bb).toBe('test');
  });

  test('zip', async () => {
    const ks = ['a', 'b', 'c'];
    const vs = [1, 2, 3];
    expect(zip(ks, vs)).toMatchObject([
      'a', 1, 'b', 2, 'c', 3,
    ]);
  });
  test('arraysToObject', async () => {
    const ks = ['a', 'b', 'c'];
    const vs = [1, 2, 3];
    expect(arraysToObject(ks, vs)).toMatchObject({
      a: 1, b: 2, c: 3,
    });
  });
  test('transformValues', async () => {
    const timesTwo = (v: number) => v * 2;
    expect(transformValues({
      a: 1, b: 2, c: 3,
    }, timesTwo)).toMatchObject({
      a: 2, b: 4, c: 6,
    });
  });
  test('transformKeys', async () => {
    const addPrefix = (k: string) => `_${k}`;
    expect(transformKeys({
      a: 1, b: 2, c: 3,
    }, addPrefix)).toMatchObject({
      _a: 1, _b: 2, _c: 3,
    });
  });

  test('hasDiff', async () => {
    const a = { a: 1 };
    const b = { b: 1 };
    const c = { a: 1 };
    expect(hasDiff(a, b)).toBe(true);
    expect(hasDiff(a, c)).toBe(false);
    expect(hasDiff(b, c)).toBe(true);
  });
  test('noDiff', async () => {
    const a = { a: 1 };
    const b = { b: 1 };
    const c = { a: 1 };
    expect(noDiff(a, b)).toBe(false);
    expect(noDiff(a, c)).toBe(true);
    expect(noDiff(b, c)).toBe(false);
  });
  test('simple diff', async () => {
    const a = { a: 1 };
    const b = { b: 1 };
    expect(diff(a, b)).toMatchObject({
      a: '-',
      b: '+',
    });
  });
  test('flat diff', async () => {
    const a = {
      a: 'a', b: 'b', c: 3, p: 0,
    };
    const b = {
      a: 'a', b: 'b', r: 2, d: 2,
    };
    expect(diff(a, b)).toMatchObject({
      c: '-',
      p: '-',
      r: '+',
      d: '+',
    });
  });

  test('nested object diff', async () => {
    const a = {
      a: 'a',
      b: 'b',
      c: 3,
      p: 0,
      specs: {
        height: 6.5,
        languageCount: 100,
      },
    };
    const b = {
      a: 'a',
      b: 'b',
      r: 2,
      d: 2,
      specs: {
        height: 1.5,
        languageCount: 1,
      },
    };
    const d = diff(a, b);
    expect(diff(a, b)).toMatchObject({
      c: '-',
      p: '-',
      r: '+',
      d: '+',
      specs: {
        height: '~',
        languageCount: '~',
      },
    });
    expect(diff(a, a)).toMatchObject({});
  });
  // TODO: Finish writing tests and adjusting `diff`
  // test('diff with subobject', async () => {
  //   const a = { a: 1, b: { a: 1, b: 2 } };
  //   const b = { b: 1 };
  //   expect(diff(a, b)).toMatchObject({
  //     a: '-',
  //     b: {
  //       '-': 1,
  //       '+': { a: 1, b: 2 },
  //     },
  //   })
  // });
  test('fullDiff', async () => {
    const a = { a: 1 };
    const b = { b: 1 };
    expect(fullDiff(a, b)).toMatchObject({
      a: { '-': 1 },
      b: { '+': 1 },
    });
  });

  test('flat fullDiff', async () => {
    const a = {
      a: 'a', b: 'b', c: 3, p: 0,
    };
    const b = {
      a: 'a', b: 'b', r: 2, d: 2,
    };
    expect(fullDiff(a, b)).toMatchObject({
      c: { '-': 3 },
      p: { '-': 0 },
      r: { '+': 2 },
      d: { '+': 2 },
    });
  });

  test('nested object fullDiff', async () => {
    const a = {
      a: 'a',
      b: 'b',
      c: 3,
      p: 0,
      specs: {
        height: 6.5,
        languageCount: 100,
      },
    };
    const b = {
      a: 'a',
      b: 'b',
      r: 2,
      d: 2,
      specs: {
        height: 1.5,
        languageCount: 1,
      },
    };
    const d = fullDiff(a, b);
    expect(fullDiff(a, b)).toMatchObject({
      c: { '-': 3 },
      p: { '-': 0 },
      r: { '+': 2 },
      d: { '+': 2 },
      specs: {
        height: { '-': 6.5, '+': 1.5 },
        languageCount: { '-': 100, '+': 1 },
      },
    });
    expect(fullDiff(a, a)).toMatchObject({});
  });

  test('compactObject removes null or undefined properties', () => {
    expect(compactObject(testPerson1)).toMatchObject({
      id: 123,
      name: 'Forest',
      favColor: '#FF0000',
      dob: '1980-01-07',
      weight: 220,
      height: 6.25,
    });
  });

  test('filterKeys does what it is intended to do', () => {
    expect(filterKeys(testPerson1, (key) => key === 'name')).toMatchObject({
      name: 'Forest',
    });
  });

  test('tail() works as expected', async () => {
    const t = tail([1, 2, 3, 4 ]);
    expect(t).toMatchObject([2, 3, 4 ]);
  });

  test('merge results in a new combined object', () => {
    expect(merge(testPerson1, { age: 40 })).toMatchObject({
      id: 123,
      name: 'Forest',
      age: 40,
      favColor: '#FF0000',
      dob: '1980-01-07',
      weight: 220,
      height: 6.25,
    });
  });

  test('merge() works correctly with several objects', async () => {
    expect(merge(testPerson1, { age: 40 }, { HP: 100, maxHP: 100 })).toMatchObject({
      id: 123,
      name: 'Forest',
      age: 40,
      favColor: '#FF0000',
      dob: '1980-01-07',
      weight: 220,
      height: 6.25,
      HP: 100,
      maxHP: 100,
    });
  });

  test('getSharedKeys returns only keys that both objects have', () => {
    expect(getSharedKeys(testPerson1, { id: 111, dob: 'dob', test: 'test' })).toMatchObject([
      'id', 'dob',
    ]);
  });

  test('remapKeys works as expected', async () => {
    expect.assertions(2);

    const sourceObj = {
      a: 123,
      b: 234,
      c: 345,
    };
    const remap = {
      a: 'a1',
      b: 'b1',
    };

    expect(remapKeys(sourceObj, remap)).toMatchObject({
      a1: 123,
      b1: 234,
    });

    expect(remapKeys(sourceObj, remap, true)).toMatchObject({
      a1: 123,
      b1: 234,
      c: 345,
    });
  });

  test('isObject ', async () => {
    const o = { a: 1, b: 2 };
    const no = '123';
    const ar = [ 1, 2, 3 ];
    expect(isDefinedObject(o)).toBe(true);
    expect(isDefinedObject(no)).toBe(false);
    expect(isDefinedObject(ar)).toBe(false);
  });

  test('pickNot', async () => {
    expect(pickNot(testPerson1, [
      'age',
      'favColor',
      'dob',
      'weight',
      'height',
    ])).toMatchObject(
      { id: 123, name: 'Forest' },
    );
  });

  test('removeField', async () => {
    expect(removeProp({ a: 1, b: 2 }, 'a')).toMatchObject({ b: 2 });
  });

  test('mapKeys', async () => {
    expect(mapKeys(testPerson1, (k) => k)).toMatchObject(['id', 'name', 'age', 'favColor', 'dob', 'weight', 'height']);
  });

  test('merge', async () => {
    const o1 = { a: 1, b: 2 };
    const o2 = { b: 3, c: 4 };
    const o = merge(o1, o2);
    expect(o).toMatchObject({ a: 1, b: 3, c: 4 });
  });
  test('mergeRight', async () => {
    const o1 = { a: 1, b: 2 };
    const o2 = { b: 3, c: 4 };
    const o = mergeRight(o1, o2);
    expect(o).toMatchObject({ a: 1, b: 2, c: 4 });
  });
  test('mergeIntersection', async () => {
    const o1 = { a: 1, b: 2 };
    const o2 = { b: 3, c: 4 };
    const o = mergeIntersection(o1, o2);
    expect(o).toMatchObject({ b: 3 });
  });

  test('pluck', async () => {
    expect(pluck({ a: 2, b: 3 }, 'a')).toBe(2);
    expect(pluck({ a: 2, b: 3 } as Hash, 'c')).toBeNull();
  });

  test('invert', async () => {
    expect(invert({ a: 1, b: 2, c: 3 })).toMatchObject({ 1: 'a', 2: 'b', 3: 'c' });
  });

  test('clone', async () => {
    const startObj = {
      a: 1, b: 'abc', c: { d: 'abc123', e: Symbol('whatever') },
    };
    const clonedObj = clone(startObj);
    expect(startObj).not.toBe(clonedObj);
    expect(clonedObj).not.toBe(startObj);
    expect(startObj.c).toBe(clonedObj.c);
    expect(diff(startObj, clonedObj)).toMatchObject({});
  });

  test('deepClone', async () => {
    const startObj = {
      a: 1, b: 'abc', c: { d: 'abc123', e: Symbol('whatever') },
    };
    const deepObj = deepClone(startObj);
    expect(startObj).not.toBe(deepObj);
    expect(deepObj).not.toBe(startObj);
    expect(startObj.c).not.toBe(deepObj.c);
    expect(diff(startObj, deepObj)).toMatchObject({});
  });

  test('deepMerge 1', async () => {
    const sym = Symbol('whatever');
    const obj1 = {
      a: 1,
      b: 'abc',
      c: { d: 'abc123', e: sym },
      d: 'b',
      e: 'de',
    };
    const obj2 = {
      a: 1,
      b: 123,
      c: { d: 'abc123', e: sym },
      f: 123,
      e: { more: 'data' },
    };
    const obj3 = deepMerge<Hash>(obj1, obj2);
    expect(obj3).toMatchObject({
      a: 1,
      b: 123,
      c: { d: 'abc123', e: sym },
      d: 'b',
      e: { more: 'data' },
      f: 123,
    });
  });
  test('deepMerge 2', async () => {
    const srcObj = { a: 1, b: 2 };
    const obj1 = {
      a: [ 1, 2, 3 ],
      b: srcObj,
    };
    const obj2 = {
      a: [ 1, 2, 4 ],
      b: srcObj,
    };
    const obj3 = deepMerge<Hash>(obj1, obj2);
    expect(obj3).toMatchObject({
      a: [ 1, 2, 3, 1, 2, 4 ],
      b: srcObj,
    });
    const obj4 = deepMerge<Hash>(obj1, obj2, 'index');
    expect(obj4).toMatchObject({
      a: [ 1, 2, 4 ],
      b: srcObj,
    });
    const obj5 = deepMerge<Hash>(obj1, obj2, 'value');
    expect(obj5).toMatchObject({
      a: [ 1, 2, 3, 4 ],
      b: srcObj,
    });
  });

  test('immutable', async () => {
    const a = { a: 1, b: 2 };
    const b = immutable(a);
    expect.assertions(3);
    expect(b).not.toBe(a);
    expect(b).toMatchObject(a);
    expect(() => { (b as any).a = 3; }).toThrow();
  });
});

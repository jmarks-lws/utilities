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
  isObject,
  pickNot,
  removeField,
  mapKeys,
  mergeRight,
  mergeIntersection,
  pluck,
  invert,
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
  }

  test('iterate can be short circiuted', () => {
    let runs = 0;
    const out: Hash = {};
    const myObj = {
      fn: (key: string, val: any, done: CallableFunction) => {
        runs += 1;
        out[key] = val;
        if (runs === 3) {
          done();
        }
      },
    }

    // const spy = spyOn(myObj, 'fn');

    iterateWithBreak(testPerson1, myObj.fn);

    // expect(spy).toHaveBeenCalledTimes(7);
    expect(keys(out).length).toBe(3);
  })

  test('iterate can loop over an everyday array', async () => {
    const input: Array<number> = [1, 2, 3, 4, 5];
    const out: Hash = {};
    iterate(input, (k, v) => { out[k] = v; })
    expect(out).toMatchObject({
      0: 1, 1: 2, 2: 3, 3: 4, 4: 5,
    })
    expect(input).toMatchObject(values(out));
  })

  test('pick correctly picks a subset', () => {
    expect(pick(testPerson1, ['id', 'name'])).toMatchObject({
      id: 123,
      name: 'Forest',
    })
  });

  test('pick doesn\'t care if a field doesn\'t exist', () => {
    expect(pick(testPerson1, ['id', 'name', 'blah', 'foo', 'bar']))
      .toMatchObject({
        id: 123,
        name: 'Forest',
      });
  });

  test('compactObject removes null or undefined properties', () => {
    expect(compactObject(testPerson1)).toMatchObject({
      id: 123,
      name: 'Forest',
      favColor: '#FF0000',
      dob: '1980-01-07',
      weight: 220,
      height: 6.25,
    })
  });

  test('tail() works as expected', async () => {
    const t = tail([1, 2, 3, 4 ]);
    expect(t).toMatchObject([2, 3, 4 ])
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
    })
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
    })
  })

  test('getSharedKeys returns only keys that both objects have', () => {
    expect(getSharedKeys(testPerson1, { id: 'id', dob: 'dob', test: 'test' })).toMatchObject([
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
    }

    expect(remapKeys(sourceObj, remap)).toMatchObject({
      a1: 123,
      b1: 234,
    });

    expect(remapKeys(sourceObj, remap, true)).toMatchObject({
      a1: 123,
      b1: 234,
      c: 345,
    })
  });

  test('isObject ', async () => {
    const o = { a: 1, b: 2 };
    const no = '123';
    const ar = [ 1, 2, 3 ];
    expect(isObject(o)).toBe(true);
    expect(isObject(no)).toBe(false);
    expect(isObject(ar)).toBe(false);
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
    expect(removeField({ a: 1, b: 2 }, 'a')).toMatchObject({ b: 2 });
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
    expect(pluck({ a: 2, b: 3 }, 'c')).toBeNull();
  });

  test('invert', async () => {
    expect(invert({ a: 1, b: 2, c: 3 })).toMatchObject({ 1: 'a', 2: 'b', 3: 'c' })
  })
})

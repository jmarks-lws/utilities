import {
  pick,
  compactObject,
  merge,
  getSharedKeys,
  remapKeys,
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
})

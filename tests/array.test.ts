import {
  map,
  preparedMap,
  prune,
  intersect,
  omit,
  insertAt,
  removeAt,
  pickEach,
  where,
  first,
  findFirst,
  last,
  findLast,
  count,
  countWhere,
  sum,
  sumWhere,
  hasAny,
  hasNone,
  hasAll,
  hash,
  compactArray,
} from '../src/array';
import { IMappableObject } from '../src/functional';

describe('Array utilities tests', () => {
  const testPeopleList1 = [
    {
      id: 123, name: 'Forest', age: 40, favColor: '#FF0000',
    },
    {
      id: 125, name: 'Tiffany', age: 53, favColor: '#FFFF00',
    },
    {
      id: 124, name: 'Lump', age: 25, favColor: '#FF00FF',
    },
    {
      id: 128, name: 'Roxanne', age: 18, favColor: '#0000FF',
    },
  ];

  describe('Basic Transformations', () => {
    test('map() :: calls array\'s .map()', () => {
      const array: number[] = [1, 2, 3]
      spyOn(array, 'map');
      map(array, (item: number) => item + 3);
      expect(array.map).toHaveBeenCalled();
    });
    test('map() :: gets correct result', () => {
      const array: number[] = [1, 2, 3]
      const added3 = map(array, (item: number) => item + 3);
      expect(added3).toMatchObject([ 4, 5, 6 ]);
    })

    test('map() :: calls .map() on a contrived IMappable', () => {
      const mappable: IMappableObject = {
        map: (fn:(el: any, ix: number, sourceArray: any[]) => any) => [],
      };

      spyOn(mappable, 'map');
      map(mappable, (item: any) => null);
      expect(mappable.map).toHaveBeenCalled();
    })

    test('preparedMap :: Returns mapping function', () => {
      expect.assertions(2);
      const add3Map = preparedMap((el: any, i: number) => el + 3);
      const added3 = add3Map([1, 2, 3]);
      expect(add3Map).toBeInstanceOf(Function);
      expect(added3).toMatchObject([4, 5, 6]);
    });

    test('prune', () => {
      expect(prune([1, 2, 3, 4, 5, 6], [2, 4, 6])).toMatchObject([1, 3, 5]);
    });
    test('intersect', () => {
      expect(intersect([1, 2, 3], [4, 5, 6])).toMatchObject([]);
      expect(intersect([1, 2, 3, 4, 5, 6, 7], [4, 6, 7, 9])).toMatchObject([4, 6, 7]);
    });
    test('omit', () => {
      expect(omit([1, 2, 3, 4, 5, 6, 7], 4)).toMatchObject([1, 2, 3, 5, 6, 7]);
    });
    test('insertAt', () => {
      expect(insertAt([1, 2, 3, 4], 5, 1)).toMatchObject([1, 5, 2, 3, 4]);
    });
    test('removeAt', () => {
      expect(removeAt([1, 2, 3, 4], 1)).toMatchObject([1, 3, 4]);
    });
  });

  describe('Advanced Transformations', () => {
    test('hash', () => {
      expect(hash(testPeopleList1, 'id')).toMatchObject({
        123: {
          id: 123, name: 'Forest', age: 40, favColor: '#FF0000',
        },
        125: {
          id: 125, name: 'Tiffany', age: 53, favColor: '#FFFF00',
        },
        124: {
          id: 124, name: 'Lump', age: 25, favColor: '#FF00FF',
        },
        128: {
          id: 128, name: 'Roxanne', age: 18, favColor: '#0000FF',
        },
      });
    });
    test('compactArray', () => {
      const compacter = [ 1, 2, 3, undefined, undefined, 4, 5, null, 6, null, 7, undefined, null, 8 ];
      expect(compactArray(compacter)).toMatchObject([1, 2, 3, 4, 5, 6, 7, 8]);
    });
  });

  describe('Query-like functionality', () => {
    test('pickEach', () => {
      expect(pickEach(testPeopleList1, ['name', 'age'])).toMatchObject([
        { name: 'Forest', age: 40 },
        { name: 'Tiffany', age: 53 },
        { name: 'Lump', age: 25 },
        { name: 'Roxanne', age: 18 },
      ])
    });
    test('where', () => {
      expect(where(testPeopleList1, (person) => person.age >= 40)).toMatchObject([
        {
          id: 123, name: 'Forest', age: 40, favColor: '#FF0000',
        },
        {
          id: 125, name: 'Tiffany', age: 53, favColor: '#FFFF00',
        },
      ])
    });
    test('first', () => {
      expect(first(testPeopleList1)).toMatchObject({
        id: 123, name: 'Forest', age: 40, favColor: '#FF0000',
      })
    });
    test('findFirst', () => {
      expect(findFirst(testPeopleList1, (person) => person.name === 'Tiffany')).toMatchObject(
        {
          id: 125, name: 'Tiffany', age: 53, favColor: '#FFFF00',
        },
      );
    });
    test('last', () => {
      expect(last(testPeopleList1)).toMatchObject(
        {
          id: 128, name: 'Roxanne', age: 18, favColor: '#0000FF',
        },
      );
    });
    test('findLast', () => {
      expect(findLast(testPeopleList1, (person) => person.age > 20)).toMatchObject({
        id: 124, name: 'Lump', age: 25, favColor: '#FF00FF',
      })
    });
  });

  describe('Aggregation Query-like', () => {
    test('count', () => {
      expect(count(testPeopleList1)).toBe(4);
    });
    test('countWhere', () => {
      expect(countWhere(testPeopleList1, (person) => person.age > 20)).toBe(3);
    });
    test('sum', () => {
      expect(sum(testPeopleList1, 'age')).toBe(40 + 53 + 25 + 18);
    });
    test('sumWhere', () => {
      expect(sumWhere(testPeopleList1, (person) => person.age > 20, 'age')).toBe(40 + 53 + 25);
    });
  })

  describe('Assertions', () => {
    test('hasAny', () => {
      expect(hasAny(testPeopleList1, (person) => person.age > 50 && person.favColor === '#FFFF00')).toBe(true);
      expect(hasAny(testPeopleList1, (person) => person.age < 50 && person.favColor === '#FFFF00')).toBe(false);
    });
    test('hasNone', () => {
      expect(hasNone(testPeopleList1, (person) => person.age > 50 && person.favColor === '#FFFF00')).toBe(false);
      expect(hasNone(testPeopleList1, (person) => person.age < 50 && person.favColor === '#FFFF00')).toBe(true);
    });
    test('hasAll', () => {
      expect(hasAll(testPeopleList1, (person) => person.age > 15)).toBe(true);
      expect(hasAll(testPeopleList1, (person) => person.age < 50)).toBe(false);
    });
  });
})

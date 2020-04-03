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
  slice,
  includes,
  head,
  tail,
  arrayCopy,
  reverse,
  chopFirst,
  chopLast,
  dropFirst,
  dropLast,
  isArray,
  reduceRight,
  reduce,
  join,
  arrayWrap,
  whereNot,
  partition,
  min,
  max,
  notIntersect,
  flatten,
  distinct,
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

  describe('Functional utility methods', () => {
    test('head', () => {
      expect(head([1, 2, 3, 4, 5])).toBe(1);
    });
    test('tail', () => {
      expect(tail([1, 2, 3, 4, 5])).toMatchObject([2, 3, 4, 5]);
    });
    test('arrayCopy', () => {
      const original = [1, 2, 3, 4];
      const copy = arrayCopy(original);
      expect.assertions(2);
      expect(copy).not.toBe(original);
      expect(copy).toMatchObject(original);
    });
    test('arrayCopy returns null for non-array', () => {
      const original = 'some string';
      const copy = arrayCopy(original as any);
      expect.assertions(2);
      expect(copy).not.toBe(original);
      expect(copy).toBeNull();
    });
    test('count', () => {
      expect.assertions(2);
      expect(count([1, 2, 3, 4, 5])).toBe(5);
      expect(count([78, 12, 3])).toBe(3);
    });
    test('reverse', () => {
      const original = [1, 3, 5, 7, 9];
      const reversed = reverse(original);
      expect(reversed).toMatchObject([9, 7, 5, 3, 1]);
    });
    test('chopFirst', () => {
      const original = [1, 3, 5, 7, 9];
      const chopped = chopFirst(original, 2);
      expect(chopped).toMatchObject([1, 3]);
    });
    test('default chopFirst', () => {
      const original = [1, 3, 5, 7, 9];
      const chopped = chopFirst(original);
      expect(chopped).toMatchObject([1]);
    });
    test('chopLast', () => {
      const original = [1, 3, 5, 7, 9];
      const chopped = chopLast(original, 2);
      expect(chopped).toMatchObject([7, 9]);
    });
    test('default chopLast', () => {
      const original = [1, 3, 5, 7, 9];
      const chopped = chopLast(original);
      expect(chopped).toMatchObject([9]);
    });
    test('dropFirst', () => {
      const original = [1, 3, 5, 7, 9];
      const chopped = dropFirst(original, 2);
      expect(chopped).toMatchObject([5, 7, 9]);
    });
    test('default dropFirst', () => {
      const original = [1, 3, 5, 7, 9];
      const chopped = dropFirst(original);
      expect(chopped).toMatchObject([1, 3, 5, 7, 9]);
    });
    test('dropLast', () => {
      const original = [1, 3, 5, 7, 9];
      const chopped = dropLast(original, 2);
      expect(chopped).toMatchObject([1, 3, 5]);
    });
    test('default dropLast', () => {
      const original = [1, 3, 5, 7, 9];
      const chopped = dropLast(original);
      expect(chopped).toMatchObject([1, 3, 5, 7, 9]);
    });
    test('arrayWrap', async () => {
      expect.assertions(4);
      const originalArray = [1, 3, 5, 7, 9];
      expect(arrayWrap(originalArray)).toMatchObject([1, 3, 5, 7, 9])
      const originalString = '1';
      expect(arrayWrap(originalString)).toMatchObject(['1']);
      const originalNull = null;
      expect(arrayWrap(originalNull)).toMatchObject([]);
      const originalUndefined = undefined;
      expect(arrayWrap(originalUndefined)).toMatchObject([]);
    })
  })

  describe('Array dot method substitutes, proxies and variations', () => {
    test('isArray', async () => {
      expect.assertions(5);
      expect(isArray([])).toBe(true);
      expect(isArray(1)).toBe(false);
      expect(isArray(false)).toBe(false);
      expect(isArray(true)).toBe(false);
      expect(isArray([true])).toBe(true);
    })
    test('slice does what is expected', async () => {
      const sliceTestList = [1, 2, 3, 4];

      expect.assertions(7);
      expect(slice(sliceTestList)).toMatchObject(sliceTestList);
      expect(slice(sliceTestList, 0, 1)).toHaveLength(1);
      expect(slice(sliceTestList, 0, 3)).toHaveLength(3);
      expect(slice(sliceTestList, 3, 4)).toHaveLength(1);
      // expect(slice(sliceTestList, 0, 1)[0].name).toMatch('Forest');
      expect(slice(sliceTestList, 0, 1)[1]).toBeUndefined();
      expect(slice(sliceTestList, 10, 15)).toHaveLength(0);
      expect(slice(sliceTestList, 10, 5)).toHaveLength(0);
    });
    test('reduce', async () => {
      const start = [ 1, 2, 3, 4 ];
      const subtract = (acc: number, current: number) => acc - current;
      const buildArray = (acc: any[], current: any) => [...acc, current];
      const subtracted = reduce(start, subtract, 4);
      expect(subtracted).toBe(-6);
      const built = reduce(start, buildArray, []);
      expect(built).toMatchObject([1, 2, 3, 4]);
    })
    test('reduceRight', async () => {
      const start = [ 1, 2, 3, 4 ];
      const subtract = (acc: number, current: number) => acc - current;
      const buildArray = (acc: any[], current: any) => [...acc, current];
      const subtracted = reduceRight(start, subtract, 4);
      expect(subtracted).toBe(-6);
      const built = reduceRight(start, buildArray, []);
      expect(built).toMatchObject([4, 3, 2, 1]);
    })
    test('join', async () => {
      expect.assertions(4);
      expect(join([1, 2, 3, 4, 5], '')).toBe('12345');
      expect(join([1, 2, 3, 4, 5], ', ')).toBe('1, 2, 3, 4, 5');
      expect(join([1, 2, 3, 4, 5], '| ')).toBe('1| 2| 3| 4| 5');
      expect(join([1, 2, 3, 4, 5], ' | ')).toBe('1 | 2 | 3 | 4 | 5');
    })
  })

  describe('Basic Transformations', () => {
    test('map() :: gets correct result', () => {
      const array: number[] = [1, 2, 3]
      const added3 = map(array, (item: number) => item + 3);
      expect(added3).toMatchObject([ 4, 5, 6 ]);
    });

    test('map() :: provides correct indexes', () => {
      const array: number[] = [1, 2, 3]
      const indexes: number[] = [];
      const added3 = map(array, (item: number, index: number) => { indexes.push(index) });
      expect(indexes).toMatchObject([ 0, 1, 2 ]);
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
    test('notIntersect', async () => {
      expect(notIntersect([1, 2, 3, 4], [4, 5, 6, 7])).toMatchObject([1, 2, 3, 5, 6, 7]);
      expect(notIntersect([1, 2, 3, 4], [1, 2, 3, 4, 5, 6, 7])).toMatchObject([5, 6, 7]);
    });
    test('omit', () => {
      expect(omit([1, 2, 3, 4, 5, 6, 7], 4)).toMatchObject([1, 2, 3, 5, 6, 7]);
    });
    test('insertAt', () => {
      const result = insertAt([1, 2, 3, 4], 5, 1);
      expect(result).toMatchObject([1, 5, 2, 3, 4]);
    });
    test('removeAt', () => {
      const result = removeAt([1, 2, 3, 4], 1);
      expect(result).toMatchObject([1, 3, 4]);
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
      const compacted = compactArray(compacter);
      expect(compacted).toMatchObject([1, 2, 3, 4, 5, 6, 7, 8]);
    });
    test('flatten', async () => {
      expect(
        flatten(
          [1, [2, [3, 4]], 5, 5, [7, 7, [8]]],
          3,
        ),
      ).toMatchObject([
        1, 2, 3, 4, 5, 5, 7, 7, 8,
      ]);
      expect(flatten([1, 2, 3])).toMatchObject([1, 2, 3]);
      expect(flatten([1, 2, 3, 4], 0)).toMatchObject([1, 2, 3, 4]);
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
    test('whereNot', async () => {
      expect(whereNot(testPeopleList1, (person) => person.age < 40)).toMatchObject([
        {
          id: 123, name: 'Forest', age: 40, favColor: '#FF0000',
        },
        {
          id: 125, name: 'Tiffany', age: 53, favColor: '#FFFF00',
        },
      ])
    });
    test('partition', async () => {
      const partitioned = partition(testPeopleList1, (el) => el.age > 40);
      const expectedOutput = [
        [
          {
            id: 125, name: 'Tiffany', age: 53, favColor: '#FFFF00',
          },
        ], [
          {
            id: 123, name: 'Forest', age: 40, favColor: '#FF0000',
          },
          {
            id: 124, name: 'Lump', age: 25, favColor: '#FF00FF',
          },
          {
            id: 128, name: 'Roxanne', age: 18, favColor: '#0000FF',
          },
        ],
      ];
      expect(partitioned).toMatchObject(expectedOutput);
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
    test('min', async () => {
      expect(min([8, 4, 3, 1, 2, -2, 7])).toBe(-2);
    });
    test('max', async () => {
      expect(max([8, 4, 3, 1, 2, -2, 9])).toBe(9);
    });
    test('distinct', async () => {
      expect(distinct([1, 1, 1, 1])).toMatchObject([1]);
      expect(distinct([1, 2, 3, 1])).toMatchObject([1, 2, 3]);
      expect(distinct([1, 2, 1, 2])).toMatchObject([1, 2]);
    })
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

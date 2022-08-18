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
  table,
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
  distinctObjects,
  series,
  group,
  findIndex,
  countDefined,
  hasOneDefined,
  hasSomeDefined,
  hasAllDefined,
  hasNoneDefined,
  replaceAt,
  slicePage,
  cloneArray,
  deepCloneArray,
  distinctOn,
  distinctOnFields,
  sort,
  prepend,
  append,
  deepMergeArrays,
  ArrayMergeMethod,
  fieldSort,
  chunkArray,
  flattenOnce,
  immutableArray,
  multiPartition,
  moveElement,
} from '../src/array';

describe('Array utilities tests', () => {
  const testPeopleList1 = [
    { id: 123, name: 'Forest', age: 40, favColor: '#FF0000', bathrooms: 1 },
    { id: 125, name: 'Tiffany', age: 53, favColor: '#FFFF00', bathrooms: 2.5 },
    { id: 124, name: 'Lump', age: 25, favColor: '#FF00FF', bathrooms: 1 },
    { id: 128, name: 'Roxanne', age: 18, favColor: '#0000FF', bathrooms: 4 },
  ];
  const testPeopleListSameOnPurpose = [
    { id: 123, name: 'Forest', age: 40, favColor: '#FF0000' },
    { id: 125, name: 'Tiffany', age: 53, favColor: '#FFFF00' },
    { id: 124, name: 'Lump', age: 25, favColor: '#FF00FF' },
    { id: 128, name: 'Roxanne', age: 18, favColor: '#0000FF' },
  ];

  describe('Functional utility methods', () => {
    test('head', async () => {
      expect(head([1, 2, 3, 4, 5])).toBe(1);
    });
    test('tail', async () => {
      expect(tail([1, 2, 3, 4, 5])).toMatchObject([2, 3, 4, 5]);
    });
    test('arrayCopy', async () => {
      const original = [1, 2, 3, 4];
      const copy = arrayCopy(original);
      expect.assertions(2);
      expect(copy).not.toBe(original);
      expect(copy).toMatchObject(original);
    });
    test('arrayCopy returns null for non-array', async () => {
      const original = 'some string';
      const copy = arrayCopy(original as any);
      expect.assertions(2);
      expect(copy).not.toBe(original);
      expect(copy).toBeNull();
    });
    test('immutableArray', async () => {
      const a = [1, 2, 3, 4];
      const b = immutableArray(a);
      expect.assertions(3);
      expect(b).not.toBe(a);
      expect(b).toMatchObject(a);
      expect(() => { (b as any).push(5); }).toThrow();
    });
    test('count', async () => {
      expect.assertions(5);
      expect(count([1, 2, 3, 4, 5])).toBe(5);
      expect(count([78, 12, 3])).toBe(3);
      expect(count('a' as unknown as string[])).toBe(1);
      expect(count(1 as unknown as string[])).toBe(1);
      expect(count(null as unknown as string[])).toBe(0);
    });
    test('reverse', async () => {
      const original = [1, 3, 5, 7, 9];
      const reversed = reverse(original);
      expect(reversed).toMatchObject([9, 7, 5, 3, 1]);
    });
    test('chopFirst', async () => {
      const original = [1, 3, 5, 7, 9];
      const chopped = chopFirst(original, 2);
      expect(chopped).toMatchObject([1, 3]);
    });
    test('default chopFirst', async () => {
      const original = [1, 3, 5, 7, 9];
      const chopped = chopFirst(original);
      expect(chopped).toMatchObject([1]);
    });
    test('chopLast', async () => {
      const original = [1, 3, 5, 7, 9];
      const chopped = chopLast(original, 2);
      expect(chopped).toMatchObject([7, 9]);
    });
    test('default chopLast', async () => {
      const original = [1, 3, 5, 7, 9];
      const chopped = chopLast(original);
      expect(chopped).toMatchObject([9]);
    });
    test('dropFirst', async () => {
      const original = [1, 3, 5, 7, 9];
      const chopped = dropFirst(original, 2);
      expect(chopped).toMatchObject([5, 7, 9]);
    });
    test('default dropFirst', async () => {
      const original = [1, 3, 5, 7, 9];
      const chopped = dropFirst(original);
      expect(chopped).toMatchObject([1, 3, 5, 7, 9]);
    });
    test('dropLast', async () => {
      const original = [1, 3, 5, 7, 9];
      const chopped = dropLast(original, 2);
      expect(chopped).toMatchObject([1, 3, 5]);
    });
    test('default dropLast', async () => {
      const original = [1, 3, 5, 7, 9];
      const chopped = dropLast(original);
      expect(chopped).toMatchObject([1, 3, 5, 7, 9]);
    });
    test('arrayWrap', async () => {
      expect.assertions(4);
      const originalArray = [1, 3, 5, 7, 9];
      expect(arrayWrap(originalArray)).toMatchObject([1, 3, 5, 7, 9]);
      const originalString = '1';
      expect(arrayWrap(originalString)).toMatchObject(['1']);
      const originalNull = null;
      expect(arrayWrap(originalNull)).toMatchObject([]);
      const originalUndefined = undefined;
      expect(arrayWrap(originalUndefined)).toMatchObject([]);
    });
  });

  describe('Array dot method substitutes, proxies and variations', () => {
    test('isArray', async () => {
      expect.assertions(5);
      expect(isArray([])).toBe(true);
      expect(isArray(1)).toBe(false);
      expect(isArray(false)).toBe(false);
      expect(isArray(true)).toBe(false);
      expect(isArray([true])).toBe(true);
    });
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
    test('slicePage does what is expected', async () => {
      const sliceTestList = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
        40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
        50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
      ];

      expect.assertions(6);
      expect(slicePage(sliceTestList, 1, 10)).toMatchObject([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(slicePage(sliceTestList, 2, 10)).toMatchObject([10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
      expect(slicePage(sliceTestList, 5, 10)).toMatchObject([40, 41, 42, 43, 44, 45, 46, 47, 48, 49]);
      expect(slicePage(sliceTestList, 7, 10)).toMatchObject([]);
      expect(slicePage(sliceTestList, 7, 5)).toMatchObject([30, 31, 32, 33, 34]);
      expect(slicePage(sliceTestList, 3, 3)).toMatchObject([6, 7, 8]);
    });
    test('reduce', async () => {
      const start = [ 1, 2, 3, 4 ];
      const subtract = (acc: number, current: number) => acc - current;
      const buildArray = (acc: any[], current: any) => [...acc, current];
      const subtracted = reduce(start, subtract, 4);
      expect(subtracted).toBe(-6);
      const built = reduce(start, buildArray, []);
      expect(built).toMatchObject([1, 2, 3, 4]);
    });
    test('reduceRight', async () => {
      const start = [ 1, 2, 3, 4 ];
      const subtract = (acc: number, current: number) => acc - current;
      const buildArray = (acc: any[], current: any) => [...acc, current];
      const subtracted = reduceRight(start, subtract, 4);
      expect(subtracted).toBe(-6);
      const built = reduceRight(start, buildArray, []);
      expect(built).toMatchObject([4, 3, 2, 1]);
    });
    test('join', async () => {
      expect.assertions(5);
      expect(join([1, 2, 3, 4, 5])).toBe('1,2,3,4,5');
      expect(join([1, 2, 3, 4, 5], '')).toBe('12345');
      expect(join([1, 2, 3, 4, 5], ', ')).toBe('1, 2, 3, 4, 5');
      expect(join([1, 2, 3, 4, 5], '| ')).toBe('1| 2| 3| 4| 5');
      expect(join([1, 2, 3, 4, 5], ' | ')).toBe('1 | 2 | 3 | 4 | 5');
    });
    test('sort', async () => {
      const newArray = sort(testPeopleList1, (a, b) => a.age - b.age);
      const expectedSorted = [
        { id: 128, name: 'Roxanne', age: 18, favColor: '#0000FF' },
        { id: 124, name: 'Lump', age: 25, favColor: '#FF00FF' },
        { id: 123, name: 'Forest', age: 40, favColor: '#FF0000' },
        { id: 125, name: 'Tiffany', age: 53, favColor: '#FFFF00' },
      ];
      expect(newArray).not.toBe(testPeopleList1);
      expect(newArray).toMatchObject(expectedSorted);
      expect(testPeopleList1).not.toMatchObject(expectedSorted);
      expect(testPeopleList1).toMatchObject(testPeopleListSameOnPurpose);
      expect(sort(null as unknown as any[], (a: any, b: any) => (a - b))).toMatchObject([]);
    });
    test('fieldSort', async () => {
      const newArray = fieldSort(testPeopleList1, 'age');
      const expectedSorted = [
        { id: 128, name: 'Roxanne', age: 18, favColor: '#0000FF' },
        { id: 124, name: 'Lump', age: 25, favColor: '#FF00FF' },
        { id: 123, name: 'Forest', age: 40, favColor: '#FF0000' },
        { id: 125, name: 'Tiffany', age: 53, favColor: '#FFFF00' },
      ];
      expect(newArray).not.toBe(testPeopleList1);
      expect(newArray).toMatchObject(expectedSorted);
      expect(testPeopleList1).not.toMatchObject(expectedSorted);
      expect(testPeopleList1).toMatchObject(testPeopleListSameOnPurpose);
      expect(fieldSort(null as unknown as any[], '')).toMatchObject([]);
    });
    test('includes', async () => {
      expect(includes(['a', 'b', 3, 5], 'a')).toBe(true);
      expect(includes(['a', 'b', 3, 5], 'c')).toBe(false);
      expect(includes(['a', 'b', 3, 5], 'A')).toBe(false);
      expect(includes(['a', 'b', 3, 5], 'D')).toBe(false);
      expect(includes(['a', 'b', 3, 5], '3')).toBe(false);
      expect(includes(['a', 'b', 3, 5], 3)).toBe(true);
    });
  });

  describe('Basic Transformations', () => {
    test('map() :: gets correct result', async () => {
      const array: number[] = [1, 2, 3];
      const added3 = map(array, (item: number) => item + 3);
      expect(added3).toMatchObject([ 4, 5, 6 ]);
    });

    test('map() :: provides correct indexes', async () => {
      const array: number[] = [1, 2, 3];
      const indexes: number[] = [];
      const added3 = map(array, (item: number, index: number) => { indexes.push(index); });
      expect(indexes).toMatchObject([ 0, 1, 2 ]);
    });

    test('prepend', async () => {
      const a = [ 1, 2, 3 ];
      const b = prepend(a, 2);
      expect(b).toMatchObject([ 2, 1, 2, 3 ]);
    });

    test('append', async () => {
      const a = [ 1, 2, 3 ];
      const b = append(a, 2);
      expect(b).toMatchObject([ 1, 2, 3, 2 ]);
    });

    test('preparedMap :: Returns mapping function', async () => {
      expect.assertions(2);
      const add3Map = preparedMap((el: any, i: number) => el + 3);
      const added3 = add3Map([1, 2, 3]);
      expect(add3Map).toBeInstanceOf(Function);
      expect(added3).toMatchObject([4, 5, 6]);
    });

    test('prune', async () => {
      expect(prune([1, 2, 3, 4, 5, 6], [2, 4, 6])).toMatchObject([1, 3, 5]);
    });
    test('intersect', async () => {
      expect(intersect([1, 2, 3], [4, 5, 6])).toMatchObject([]);
      expect(intersect([1, 2, 3, 4, 5, 6, 7], [4, 6, 7, 9])).toMatchObject([4, 6, 7]);
    });
    test('notIntersect', async () => {
      expect(notIntersect([1, 2, 3, 4], [4, 5, 6, 7])).toMatchObject([1, 2, 3, 5, 6, 7]);
      expect(notIntersect([1, 2, 3, 4], [1, 2, 3, 4, 5, 6, 7])).toMatchObject([5, 6, 7]);
    });
    test('omit', async () => {
      expect(omit([1, 2, 3, 4, 5, 6, 7], 4)).toMatchObject([1, 2, 3, 5, 6, 7]);
    });
    test('insertAt', async () => {
      const result = insertAt([1, 2, 3, 4], 1, 5);
      expect(result).toMatchObject([1, 5, 2, 3, 4]);
    });
    test('removeAt', async () => {
      const result = removeAt([1, 2, 3, 4], 1);
      expect(result).toMatchObject([1, 3, 4]);
    });
    test('move', async () => {
      const result1 = moveElement([1, 2, 3, 4, 5], 2, 4);
      expect(result1).toMatchObject([1, 2, 4, 5, 3]);
      const result2 = moveElement([1, 2, 3, 4, 5], 0, 4);
      expect(result2).toMatchObject([2, 3, 4, 5, 1]);
      const result3 = moveElement([1, 2, 3, 4, 5], 1, 3);
      expect(result3).toMatchObject([1, 3, 4, 2, 5]);
      const result4 = moveElement([1, 2, 3, 4, 5], 3, 1);
      expect(result4).toMatchObject([1, 4, 2, 3, 5]);
      const result5 = moveElement([1, 2, 3, 4, 5], 3, 0);
      expect(result5).toMatchObject([4, 1, 2, 3, 5]);
      const result6 = moveElement([1, 2, 3, 4, 5], 4, 0);
      expect(result6).toMatchObject([5, 1, 2, 3, 4]);
    });
    test('replaceAt', async () => {
      const result = replaceAt([1, 2, 3, 4], 1, 1);
      expect(result).toMatchObject([1, 1, 3, 4]);
      expect(replaceAt([1, 2, 3, 4], 3, 8)).toMatchObject([1, 2, 3, 8]);
    });
  });

  describe('Advanced Transformations', () => {
    test('hash', async () => {
      const result = table(testPeopleList1, 'id');
      expect(result).toMatchObject({
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
    test('compactArray', async () => {
      const compacter = [ 1, 2, 3, undefined, undefined, 4, 5, null, 6, null, 7, undefined, null, 8 ];
      const compacted = compactArray(compacter);
      expect(compacted).toMatchObject([1, 2, 3, 4, 5, 6, 7, 8]);
    });
    test('compactArray allowing nulls', async () => {
      const compacter = [ 1, 2, 3, undefined, undefined, 4, 5, null, 6, null, 7, undefined, null, 8 ];
      const compacted = compactArray(compacter, true);
      expect(compacted).toMatchObject([1, 2, 3, 4, 5, null, 6, null, 7, null, 8]);
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
    test('flattenOnce', async () => {
      expect(
        flattenOnce([[1, 2], [3, 4], [5, 5, 7, 7, 8]] as any[]),
      ).toMatchObject(
        [1, 2, 3, 4, 5, 5, 7, 7, 8],
      );
      expect(
        flattenOnce([[1, [2, [3, 4]], 5], [5, [7, 7, [8]]]] as any[]),
      ).toMatchObject(
        [1, [2, [3, 4]], 5, 5, [7, 7, [8]]],
      );
    });
    test('chunkArray', async () => {
      expect(chunkArray([1, 2, 3, 4, 5, 6], 2)).toMatchObject([[1, 2], [3, 4], [5, 6]]);
    });
  });

  describe('Query-like functionality', () => {
    test('pickEach', async () => {
      expect(pickEach(testPeopleList1, ['name', 'age'])).toMatchObject([
        { name: 'Forest', age: 40 },
        { name: 'Tiffany', age: 53 },
        { name: 'Lump', age: 25 },
        { name: 'Roxanne', age: 18 },
      ]);
    });
    test('where', async () => {
      expect(where(testPeopleList1, (person) => person.age >= 40)).toMatchObject([
        {
          id: 123, name: 'Forest', age: 40, favColor: '#FF0000',
        },
        {
          id: 125, name: 'Tiffany', age: 53, favColor: '#FFFF00',
        },
      ]);
    });
    test('whereNot', async () => {
      expect(whereNot(testPeopleList1, (person) => person.age < 40)).toMatchObject([
        {
          id: 123, name: 'Forest', age: 40, favColor: '#FF0000',
        },
        {
          id: 125, name: 'Tiffany', age: 53, favColor: '#FFFF00',
        },
      ]);
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
    test('multiPartition', async () => {
      const partitioned = multiPartition(testPeopleList1, [
        (el) => el.age > 40,
        (el) => el.age < 25,
      ]);
      const expectedOutput = [
        [
          {
            id: 125, name: 'Tiffany', age: 53, favColor: '#FFFF00',
          },
        ], [
          {
            id: 128, name: 'Roxanne', age: 18, favColor: '#0000FF',
          },
        ], [
          {
            id: 123, name: 'Forest', age: 40, favColor: '#FF0000',
          },
          {
            id: 124, name: 'Lump', age: 25, favColor: '#FF00FF',
          },
        ],
      ];
      expect(partitioned).toMatchObject(expectedOutput);
    });
    test('first', async () => {
      expect(first(testPeopleList1)).toMatchObject({
        id: 123, name: 'Forest', age: 40, favColor: '#FF0000',
      });
    });
    test('findFirst', async () => {
      expect(findFirst(testPeopleList1, (person) => person.name === 'Tiffany')).toMatchObject(
        {
          id: 125, name: 'Tiffany', age: 53, favColor: '#FFFF00',
        },
      );
    });
    test('findIndex', async () => {
      expect(findIndex(testPeopleList1, (person) => person.name === 'Tiffany')).toBe(1);
    });
    test('last', async () => {
      expect(last(testPeopleList1)).toMatchObject(
        {
          id: 128, name: 'Roxanne', age: 18, favColor: '#0000FF',
        },
      );
    });
    test('findLast', async () => {
      expect(findLast(testPeopleList1, (person) => person.age > 20)).toMatchObject({
        id: 124, name: 'Lump', age: 25, favColor: '#FF00FF',
      });
    });
  });

  describe('Aggregation Query-like', () => {
    test('count', async () => {
      expect(count(testPeopleList1)).toBe(4);
    });
    test('countWhere', async () => {
      expect(countWhere(testPeopleList1, (person) => person.age > 20)).toBe(3);
    });
    test('sum', async () => {
      expect(sum(testPeopleList1, 'age')).toBe(40 + 53 + 25 + 18);
      expect(sum(testPeopleList1, 'bathrooms')).toBe(1 + 2.5 + 1 + 4);
    });
    test('sumWhere', async () => {
      expect(sumWhere(testPeopleList1, (person) => person.age > 20, 'age')).toBe(40 + 53 + 25);
    });
    test('min', async () => {
      expect(min([8, 4, 3, 1, 2, -2, 7])).toBe(-2);
    });
    test('min', async () => {
      expect(min(['b', 't', 'a'])).toBe('a');
    });
    test('max', async () => {
      expect(max([8, 4, 3, 1, 2, -2, 9])).toBe(9);
    });
    test('max', async () => {
      expect(max(['b', 't', 'a'])).toBe('t');
    });
    test('distinct', async () => {
      expect(distinct([1, 1, 1, 1])).toMatchObject([1]);
      expect(distinct([1, 2, 3, 1])).toMatchObject([1, 2, 3]);
      expect(distinct([1, 2, 1, 2])).toMatchObject([1, 2]);
    });
  });

  describe('Defined aggregation', () => {
    const oneUndefined = [ undefined, 1, 2, 3 ];
    const oneDefined = [ undefined, 1, undefined, undefined ];
    const allDefined = [ 1, 2, 3, 4 ];
    const twoUndefined = [ undefined, 1, 2, 3, undefined ];
    const allUndefined = [ undefined, undefined, undefined ];

    test('countDefined', async () => {
      expect(countDefined(oneUndefined)).toBe(3);
      expect(countDefined(oneDefined)).toBe(1);
      expect(countDefined(allDefined)).toBe(4);
      expect(countDefined(twoUndefined)).toBe(3);
      expect(countDefined(allUndefined)).toBe(0);
    });

    test('hasOneDefined', async () => {
      expect(hasOneDefined(oneUndefined)).toBe(false);
      expect(hasOneDefined(oneDefined)).toBe(true);
      expect(hasOneDefined(allDefined)).toBe(false);
      expect(hasOneDefined(twoUndefined)).toBe(false);
      expect(hasOneDefined(allUndefined)).toBe(false);
    });

    test('hasSomeDefined', async () => {
      expect(hasSomeDefined(oneUndefined)).toBe(true);
      expect(hasSomeDefined(oneDefined)).toBe(true);
      expect(hasSomeDefined(allDefined)).toBe(true);
      expect(hasSomeDefined(twoUndefined)).toBe(true);
      expect(hasSomeDefined(allUndefined)).toBe(false);
    });

    test('hasAllDefined', async () => {
      expect(hasAllDefined(oneUndefined)).toBe(false);
      expect(hasAllDefined(oneDefined)).toBe(false);
      expect(hasAllDefined(allDefined)).toBe(true);
      expect(hasAllDefined(twoUndefined)).toBe(false);
      expect(hasAllDefined(allUndefined)).toBe(false);
    });

    test('hasNoneDefined', async () => {
      expect(hasNoneDefined(oneUndefined)).toBe(false);
      expect(hasNoneDefined(oneDefined)).toBe(false);
      expect(hasNoneDefined(allDefined)).toBe(false);
      expect(hasNoneDefined(twoUndefined)).toBe(false);
      expect(hasNoneDefined(allUndefined)).toBe(true);
    });
  });

  describe('Assertions', () => {
    test('hasAny', async () => {
      expect(hasAny(testPeopleList1, (person) => person.age > 50 && person.favColor === '#FFFF00')).toBe(true);
      expect(hasAny(testPeopleList1, (person) => person.age < 50 && person.favColor === '#FFFF00')).toBe(false);
    });
    test('hasNone', async () => {
      expect(hasNone(testPeopleList1, (person) => person.age > 50 && person.favColor === '#FFFF00')).toBe(false);
      expect(hasNone(testPeopleList1, (person) => person.age < 50 && person.favColor === '#FFFF00')).toBe(true);
    });
    test('hasAll', async () => {
      expect(hasAll(testPeopleList1, (person) => person.age > 15)).toBe(true);
      expect(hasAll(testPeopleList1, (person) => person.age < 50)).toBe(false);
    });
  });

  describe('Jet fuel', () => {
    test('`series` creates series 0 to 4', async () => {
      expect(series(5)).toMatchObject([0, 1, 2, 3, 4]);
    });
    test('`series` creates series 5 to 10', async () => {
      expect(series(5, 5)).toMatchObject([5, 6, 7, 8, 9]);
    });
    test('`group` groups correctly', async () => {
      const start = [
        { name: 'James', gender: 'male' },
        { name: 'Jenny', gender: 'female' },
        { name: 'Aesther', gender: 'female' },
        { name: 'Johnny', gender: 'male' },
        { name: 'Geraldine', gender: 'female' },
        { name: 'Gerard', gender: 'male' },
        { name: 'George', gender: 'male' },
        { name: 'Djin', gender: 'unknown' },
      ];

      expect(group(start, 'gender')).toMatchObject({
        male: [
          { name: 'James', gender: 'male' },
          { name: 'Johnny', gender: 'male' },
          { name: 'Gerard', gender: 'male' },
          { name: 'George', gender: 'male' },
        ],
        female: [
          { name: 'Jenny', gender: 'female' },
          { name: 'Aesther', gender: 'female' },
          { name: 'Geraldine', gender: 'female' },
        ],
        unknown: [
          { name: 'Djin', gender: 'unknown' },
        ],
      });
    });
    test('`distinctObjects`', async () => {
      const original = [
        { a: 1, b: 'abc', c: 2 },
        { a: 12, b: 'abc', c: 2 },
        { a: 1, b: 'abc', c: 2 },
        { a: 1, b: 'abc', c: 2 },
      ];
      expect(distinctObjects(original)).toMatchObject([
        { a: 1, b: 'abc', c: 2 },
        { a: 12, b: 'abc', c: 2 },
      ]);
    });

    test('`distinctOn`', async () => {
      const original = [
        { a: 1, b: 'abc', c: 2 },
        { a: 12, b: 'abc', c: 2 },
        { a: 1, b: 'abc', c: 2 },
        { a: 1, b: 'abc', c: 3 },
      ];
      expect(distinctOn(original, (x, y) => x.b === y.b && x.c === y.c)).toMatchObject([
        { a: 1, b: 'abc', c: 2 },
        { a: 1, b: 'abc', c: 3 },
      ]);
    });

    test('`distinctOnFields`', async () => {
      const original = [
        { a: 1, b: 'abc', c: 2 },
        { a: 12, b: 'abc', c: 2 },
        { a: 1, b: 'abc', c: 2 },
        { a: 1, b: 'abc', c: 3 },
        { a: 1, b: 'abc', c: 4 },
      ];
      expect(distinctOnFields(original, [ 'b', 'c' ])).toMatchObject([
        { a: 1, b: 'abc', c: 2 },
        { a: 1, b: 'abc', c: 3 },
        { a: 1, b: 'abc', c: 4 },
      ]);
    });

    test('`cloneArray`', async () => {
      const a1 = [ 1, 2, 3, 4, 5, 6, 7];
      expect(cloneArray(a1)).toMatchObject(a1);

      const a2 = [ 1, 2, 3, [4, 5, 6, 7], { b: 'a', c: [ 1, 2, 3] }];
      const complexClone = cloneArray(a2);
      expect(complexClone).toMatchObject(a2);
      expect(Object.is(complexClone[3], a2[3])).toBe(true);
      expect(Object.is(complexClone[4], a2[4])).not.toBe(true);
    });

    test('`deepCloneArray`', async () => {
      const a1 = [ 1, 2, 3, 4, 5, 6, 7];
      expect(deepCloneArray(a1)).toMatchObject(a1);

      const a2 = [ 1, 2, 3, [4, 5, 6, 7], { b: 'a', c: [ 1, 2, 3] }];
      const complexClone = deepCloneArray(a2);
      expect(complexClone).toMatchObject(a2);
      expect(Object.is(complexClone[3], a2[3])).not.toBe(true);
      expect(Object.is(complexClone[4], a2[4])).not.toBe(true);
      expect(
        Object.is(
          (complexClone[4] as { b: string, c: number[] }).c,
          (a2[4] as { b: string, c: number[] }).c,
        ),
      ).not.toBe(true);
    });

    test('`deepMergeArrays` 1', async () => {
      const a = [ 1, 2, 3 ];
      const b = [ 1, 2, 3, 4 ];
      const c = deepMergeArrays(a, b);
      expect(c).toMatchObject([1, 2, 3, 1, 2, 3, 4]);
      const d = deepMergeArrays(a, b, 'value');
      expect(d).toMatchObject([1, 2, 3, 4]);
      const e = deepMergeArrays(a, b, 'index');
      expect(e).toMatchObject([1, 2, 3, 4]);
    });

    test('`deepMergeArrays` 2', async () => {
      const sameObj = { a: 1, b: 2 };
      const a = [ sameObj, { a: 1, b: 2 } ];
      const b = [ sameObj, { a: 1, b: 2 } ];
      const c = deepMergeArrays(a, b);
      expect(c).toMatchObject([{ a: 1, b: 2 }, { a: 1, b: 2 }, { a: 1, b: 2 }, { a: 1, b: 2 }]);
      const d = deepMergeArrays(a, b, 'value');
      expect(d).toMatchObject([{ a: 1, b: 2 }, { a: 1, b: 2 }, { a: 1, b: 2 }]);
      const e = deepMergeArrays(a, b, 'index');
      expect(e).toMatchObject([{ a: 1, b: 2 }, { a: 1, b: 2 }]);
    });

    test('`deepMergeArrays` 3', async () => {
      const el1 = [ 'a', 1, 'b', 2 ];
      const el2 = [ 'c', 3, 'd', 4 ];
      const el3 = [ 'c', 3, 'd', 4 ];

      const a = [ el1, el2 ];
      const b = [ el1, el3, el2 ];
      const c = deepMergeArrays(a, b);
      expect(c).toMatchObject([ el1, el2, el1, el3, el2 ]);
      const d = deepMergeArrays(a, b, 'value');
      expect(d).toMatchObject([ el1, el3, el2 ]);
      const e = deepMergeArrays(a, b, 'index');
      expect(e).toMatchObject([ el1, el3, el2 ]);
    });

    test('`deepMergeArrays` 4', async () => {
      const el1 = [ 'a', 1, 'b', 2 ];
      const el2 = [ 'c', 3, 'd', 4 ];
      const el3 = [ 'c', 3, 'd', 4 ];

      const a = [ el1, el3, el2 ];
      const b = [ el1, el2 ];
      const c = deepMergeArrays(a, b);
      expect(c).toMatchObject([ el1, el3, el2, el1, el2 ]);
      const d = deepMergeArrays(a, b, 'value');
      expect(d).toMatchObject([ el1, el2, el3 ]);
      const e = deepMergeArrays(a, b, 'index');
      expect(e).toMatchObject([ el1, el2, el2 ]);
    });

    test('`deepMergeArrays` 5', async () => {
      const el1 = [ 'a', 1, 'b', 2 ];
      const el2 = [ 'c', 3, 'd', 4 ];
      const el3 = [ 'c', 3, 'd', 4 ];

      const a = [ 'a', el3, el2 ];
      const b = [ el1, el2 ];
      const c = deepMergeArrays(a, b);
      expect(c).toMatchObject([ 'a', el3, el2, el1, el2 ]);
      const d = deepMergeArrays(a, b, 'value');
      expect(d).toMatchObject([ 'a', el2, el3, el1 ]);
      const e = deepMergeArrays(a, b, 'index');
      expect(e[0]).toBe(el1);
      expect(e[1]).toMatchObject(el2);
      expect(e[2]).toMatchObject(el2);
    });

    test('`deepMergeArrays` 5', async () => {
      expect(() => {
        deepMergeArrays(['a'], ['b'], 'wahtever' as ArrayMergeMethod);
      }).toThrow();
    });

    test('`deepMergeArrays` 6', async () => {
      const c = deepMergeArrays(
        null as any as any[],
        [ undefined ],
        'index',
      );
      expect(c).toMatchObject([ undefined ]);
    });
  });
});

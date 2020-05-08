import { pipe, asyncPipe, stringToBool } from '../src';

describe('Pipe tests', () => {
  test('pipe does things in order a', () => {
    const p = pipe((a: number) => a + 1, (a: number) => a * 7, (a: number) => a - 3, (a: number) => a / 2);
    const v = p(2);
    expect(v).toBe(9);
  });
  test('pipe does things in order b', () => {
    const p = pipe(
      (person: any) => person.name,
      (name: any) => name.first,
      (firstName: any) => firstName.toLowerCase(),
      (formattedName: any) => formattedName.slice(0, 1).toUpperCase() + formattedName.slice(1),
    );
    const v = p({ name: { first: 'jAMES', last: 'marks' } });
    expect(v).toBe('James');
  });
  test('pipe ignores empty values', () => {
    const p = pipe(
      (person: any) => person.name,
      null as unknown as CallableFunction,
      (name: any) => name.first,
      (firstName: any) => firstName.toLowerCase(),
      (formattedName: any) => formattedName.slice(0, 1).toUpperCase() + formattedName.slice(1),
    );
    const v = p({ name: { first: 'jAMES', last: 'marks' } });
    expect(v).toBe('James');
  });
  test('asyncPipe does things in order a', async () => {
    const p = asyncPipe(
      async (a: number) => a + 1,
      async (a: number) => a * 7,
      async (a: number) => a - 3,
      async (a: number) => a / 2,
    );
    const v = await p(2);
    expect(v).toBe(9);
  });
  test('asyncPipe does things in order b', async () => {
    const p = asyncPipe(
      (person: any) => person.name,
      (name: any) => name.first,
      (firstName: any) => firstName.toLowerCase(),
      (formattedName: any) => formattedName.slice(0, 1).toUpperCase() + formattedName.slice(1),
    );
    const v = await p({ name: { first: 'jAMES', last: 'marks' } });
    expect(v).toBe('James');
  });
});

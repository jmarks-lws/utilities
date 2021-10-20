import { Hash } from './types/Hash';

// TODO: Document, Test and cascade export up
export const alterProp = <TIn extends Hash, TOut extends any>(
  obj: TIn,
  fieldName: keyof TIn,
  alteration: (val: TIn[keyof TIn]) => TOut,
) => ({
    ...obj,
    [fieldName]: alteration(obj[fieldName]),
  });

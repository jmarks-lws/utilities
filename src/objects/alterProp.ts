import { Hash } from './types/Hash';

// TODO: Document, Test and cascade export up
export const alterProp = <TIn extends Hash, TOut extends any>(
  obj: TIn,
  fieldName: keyof TIn,
  alteration: (val: unknown) => TOut,
) => ({
    ...obj,
    [fieldName]: alteration(obj[fieldName]),
  });

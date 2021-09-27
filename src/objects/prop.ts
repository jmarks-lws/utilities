import { hasKey } from './hasKey';
import { Hash } from './types/Hash';
import { Nullable } from '../misc/types/Nullable';

/**
 * Gets a value from an object property with an optional default value.
 * @param o
 * @param key
 * @param defaultValue
 */
export const prop = <
  TInput extends Hash,
  TField extends keyof TInput,
  TReturn = TInput[TField],
>(o: TInput, key: TField, defaultValue: Nullable<TReturn> = null): Nullable<TReturn> => (
    hasKey(o, key) ? o[key] : defaultValue
  );

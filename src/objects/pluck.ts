import { hasKey } from './hasKey';
import { Nullable } from '../misc/types/Nullable';
import { Hash } from './types/Hash';

/**
 * Safely get a value from an object
 * @param obj
 * @param field
 */
export const pluck = <
  TInput extends Hash,
  TField extends keyof TInput,
  TReturn = TInput[TField],
>(
    obj: TInput,
    field: TField,
  ): Nullable<TReturn> => obj[field] ?? null;

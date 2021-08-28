import { isDefinedObject } from './isDefinedObject';
import { keys } from './keys';
import { merge } from './merge';
import { Hash } from './types/Hash';

/**
 * Reduces object to a flat key-value list with no nested objects.
 * Warning: This method is destructive. If a nested object has the same key as a parent object, the value will be
 * overwritten with by the value from the nested object. This applies at any depth.
 * You will also lose the original keys corresponding to the nested objects.
 * @param object - The object to flatten
 */
export const flattenObject = (object: Hash): Hash => keys(object).reduce((acc, key) => {
  // TODO: Test this
  const value = object[key];
  return merge(acc, isDefinedObject(value) ? flattenObject(value) : { [key]: value });
}, {});

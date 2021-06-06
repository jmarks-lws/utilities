/**
 * Returns the result of forcing `value` to be the nearest number between `minValue` and `maxValue`
 * @param value
 * @param minValue
 * @param maxValue
 */
export const clamp = (value: number, minValue: number, maxValue: number) => (
  Math.max(Math.min(value, maxValue), minValue)
);

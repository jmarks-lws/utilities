/**
 * Returns a boolean indicating whether the provided string value is valid JSON
 * @param value - String value to test for valid JSON value.
 */
export const isValidJSON = (value: string) => {
  try {
    JSON.parse(value);
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * Returns `true` if the provided string is the string 'true' (case insensitive), otherwise returns `false`.
 * @param s - String to convert to boolean.
 */
export const stringToBool = (s: string): boolean => (s.toLowerCase() === 'true');

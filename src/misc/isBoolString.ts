/**
 * Determines whether the given string is either 'true' or 'false' (case insensitive).
 * @param s - String to test
 */
export const isBoolString = (s: string): s is 'true' | 'false' => ['true', 'false'].includes(s.toLowerCase());

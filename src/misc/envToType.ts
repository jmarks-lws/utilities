import { stringToBool } from './stringToBool';
import { isBoolString } from './isBoolString';
import { floatVal } from './floatVal';
import { isNumeric } from './isNumeric';

/**
 * Attempts to convert a string environment variable to its appropriate JS data type. If it appears numeric, it will return a Number.
 * If it appears to be a boolean string, it will return a boolean value. Otherwise it will return the provided string.
 * @param env - The environment variable value to convert to its appropriate type. Use 'as <Type>' to provide relevant data type for application.
 */
export const envToType = (env: string): number | boolean | string => (
  // eslint-disable-next-line no-nested-ternary
  isNumeric(env)
    ? floatVal(env)
    : (isBoolString(env) ? stringToBool(env) : env as string)
);

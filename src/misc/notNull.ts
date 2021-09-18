import { isNull } from './isNull';

/** Returns true if `x` is NOT `null` */
export const notNull = (x: unknown) => !isNull(x);

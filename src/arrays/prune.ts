import { where } from './where';
import { includes } from './includes';

/**
 * Returns a new array which is the result of removing elements from `initialList` which are also in `pruneList`
 * @param initialList - List to prune from. The source list is not affected. A new array will be returned.
 * @param pruneList - List of elements to remove.
 */
export const prune = <T>(
  initialList: T[],
  pruneList: T[],
) => where(initialList, (el: T) => !includes(pruneList, el));

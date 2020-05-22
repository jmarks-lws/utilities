import { intVal } from '../misc/intVal';

/**
 *
 * @param str A date string expected to be in the format `[year]-[month]-[day]T[hour]:[min]:[sec]:[ms]` in 24 hour UTC time
 *  - you may omit the entire timestamp, just don't include the T
 */
export const utcYmdToDate = (str: string) => {
  const [ date, time ] = str.split('T');
  const [ year, month, dayOfMonth ] = date.split('-').map((s) => intVal(s));
  const [ hour, minute, second, millisecond ] = (time ?? '').split(':').filter((s) => s !== '').map((s) => intVal(s));
  if (hour) {
    if (millisecond) return new Date(Date.UTC(year, month - 1, dayOfMonth, hour, minute, second, millisecond));
    return new Date(Date.UTC(year, month - 1, dayOfMonth, hour, minute, second));
  }
  return new Date(Date.UTC(year, month - 1, dayOfMonth));
};

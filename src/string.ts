import { isNumber, intVal } from './miscellaneous';

export const padLeft = (subject: string, desiredLength: number, prefixCharacter: string = ' '): string => (
  (!isNumber(desiredLength) && padLeft(subject, intVal(desiredLength), prefixCharacter))
    || (desiredLength < subject.length && subject)
    || (prefixCharacter.repeat(desiredLength - subject.length) + subject).slice(-desiredLength)
)

export const padRight = (subject: string, desiredLength: number, prefixCharacter: string = ' '): string => (
  (!isNumber(desiredLength) && padRight(subject, intVal(desiredLength), prefixCharacter))
    || (desiredLength < subject.length && subject)
    || (subject + prefixCharacter.repeat(desiredLength - subject.length)).slice(0, desiredLength)
)

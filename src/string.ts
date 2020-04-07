import { isNumber, intVal } from './miscellaneous';

/** Pads a string (`subject`) by prepending enough `prefixCharacter`s to create a string with a length `desiredLength` */
export const padLeft = (subject: string, desiredLength: number, prefixCharacter: string = ' '): string => (
  (!isNumber(desiredLength) && padLeft(subject, intVal(desiredLength), prefixCharacter))
    || (desiredLength <= subject.length && subject)
    || (prefixCharacter.repeat(desiredLength - subject.length) + subject).slice(-desiredLength)
)

/** Pads a string (`subject`) by appending enough `suffixCharacter`s to the right side to create a string with a length `desiredLength` */
export const padRight = (subject: string, desiredLength: number, suffixCharacter: string = ' '): string => (
  (!isNumber(desiredLength) && padRight(subject, intVal(desiredLength), suffixCharacter))
    || (desiredLength <= subject.length && subject)
    || (subject + suffixCharacter.repeat(desiredLength - subject.length)).slice(0, desiredLength)
)

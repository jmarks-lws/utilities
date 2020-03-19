
export const leftPad = (subject: string, desiredLength: number, prefixCharacter: string = ' ') => {
  const sourceLength = subject.length;
  const targetLength = parseInt(`${desiredLength}`, 10);

  if (targetLength < sourceLength) return subject;

  const padding = targetLength - sourceLength;
  return (prefixCharacter.repeat(padding) + subject).slice(-targetLength);
}

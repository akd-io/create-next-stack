export const prettyCommand = (file: string, args: string[]): string => {
  return [file, ...args].join(" ")
}

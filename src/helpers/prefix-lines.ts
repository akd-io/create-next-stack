export const prefixLines = (prefix: string, lines: string) => {
  return prefix + lines.replace("\n", "\n" + prefix)
}

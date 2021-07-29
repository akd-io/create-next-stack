export const prefixLines = (prefix: string, lines: string) => {
  return prefix + lines.split("\n").join("\n" + prefix)
}

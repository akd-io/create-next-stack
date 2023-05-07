export const stringify = (value: unknown): string => {
  return JSON.stringify(value, null, 2)
}

export type UnknownArray = unknown[]

/**
 * Used to test if a variable is an array and to yield stronger typing than `Array.isArray()` returns.
 * @param x The variable under test
 * @returns Whether x is an array and a strongly typed version of the object.
 */
export const isUnknownArray = (x: unknown): x is UnknownArray => {
  return Array.isArray(x)
}

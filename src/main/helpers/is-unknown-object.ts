export type UnknownObject = { [key in PropertyKey]: unknown }

/**
 * Used to test if a variable is an object and to yield stronger typing than `typeof x === "object"` does.
 * Copied and slightly modified from: https://github.com/microsoft/TypeScript/issues/25720#issuecomment-533438205
 * @param x The variable under test
 * @returns Whether x is an object and a strongly typed version of the object.
 */
export const isUnknownObject = (x: unknown): x is UnknownObject => {
  return x !== null && typeof x === "object"
}

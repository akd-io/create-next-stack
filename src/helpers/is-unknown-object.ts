/**
 * Used to test if a variable is an object and yield stronger typing than `typeof x === "object"` does.
 * Copied from: https://github.com/microsoft/TypeScript/issues/25720#issuecomment-533438205
 * @param x The variable under test
 * @returns Whether x is an object and a strongly typed version of the object.
 */
export function isUnknownObject(
  x: unknown
): x is { [key in PropertyKey]: unknown } {
  return x !== null && typeof x === "object"
}

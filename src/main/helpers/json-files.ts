import { promises as fs } from "fs"
import { isUnknownArray } from "./is-unknown-array"
import { isUnknownObject } from "./is-unknown-object"

export const modifyJsonFile = async (
  path: string,
  callback: (oldObject: Record<string, unknown>) => Record<string, unknown>
): Promise<void> => {
  const oldObject = await readJsonFile(path)
  const newObject = callback(oldObject)
  await writeJsonFile(path, newObject)
}

export const readJsonFile = async (
  path: string
): Promise<Record<string, unknown>> => {
  const jsonString = await fs.readFile(path, "utf8")
  const jsonObject = JSON.parse(jsonString)

  if (!isUnknownObject(jsonObject)) {
    throw new TypeError("Expected json object to be an object.")
  }

  return jsonObject
}

export const writeJsonFile = async (
  fileName: string,
  object: Record<string, unknown>
): Promise<void> => {
  const objectString = JSON.stringify(object, null, 2)
  await fs.writeFile(fileName, objectString)
}

/**
 * `toObject` takes an unknown variable, `object` and returns `object` if it's an object, or `{}` otherwise.
 * This makes it very easy to spread several layers of a JSON object, for example in combination with `modifyJsonFile`:
 *
 * ```typescript
 * await modifyJsonFile("tsconfig.json", (tsConfig) => ({
 *   ...tsConfig,
 *   compilerOptions: {
 *     ...toObject(tsConfig.compilerOptions),
 *     jsxImportSource: "@emotion/react",
 *   },
 * }))
 * ```
 *
 * @param object
 * @returns
 */
export const toObject = (object: unknown): Record<string, unknown> => {
  if (isUnknownObject(object)) {
    return object
  } else {
    return {}
  }
}

/**
 * `toArray` takes an unknown variable, `array` and returns `array` if it's an array, or `[]` otherwise.
 * This makes it very easy to spread several layers of a JSON object, for example in combination with `modifyJsonFile`:
 *
 * ```typescript
 * await modifyJsonFile(".babelrc", (babelConfig) => ({
 *   ...babelConfig,
 *   plugins: [
 *     ["babel-plugin-styled-components"],
 *     ...toArray(babelConfig.plugins),
 *   ],
 * }))
 * ```
 *
 * @param object
 * @returns
 */
export const toArray = (value: unknown): unknown[] => {
  if (isUnknownArray(value)) {
    return value
  } else if (typeof value === "string") {
    return [value]
  } else {
    return []
  }
}

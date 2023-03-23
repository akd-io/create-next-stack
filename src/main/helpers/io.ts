import { existsSync } from "fs"
import fs from "fs/promises"
import { logDebug, logError } from "../logging"
import { isUnknownArray } from "./is-unknown-array"
import { isUnknownObject } from "./is-unknown-object"
import { stringify } from "./stringify"

export const makeDirectory = async (path: string): Promise<void> => {
  logDebug("Making directory:", path)
  if (!existsSync(path)) {
    await fs.mkdir(path, { recursive: true })
  }
}

export const writeFile: typeof fs.writeFile = async (file, data, options) => {
  logDebug("Writing file:", file.toString())
  return fs.writeFile(file, data, options)
}

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
  logDebug("Reading json file:", path)
  const jsonString = await fs.readFile(path, "utf8")

  let jsonObject
  try {
    jsonObject = JSON.parse(jsonString)
  } catch {
    logError("Error passing json file.")
    logError("path:", path)
    logError("jsonString:", jsonString)
    throw new Error("Expected json file to be valid JSON.")
  }

  if (!isUnknownObject(jsonObject)) {
    throw new TypeError("Expected json object to be an object.")
  }

  return jsonObject
}

export const writeJsonFile = async (
  fileName: string,
  object: Record<string, unknown>
): Promise<void> => {
  logDebug("Writing json file:", fileName)
  const objectString = stringify(object)
  await fs.writeFile(fileName, objectString)
}

/**
 * `toObject` takes an unknown variable, `value` and returns `value` if it's an object, or `{}` otherwise.
 * This makes it possible to spread a nullable object, for example in combination with `modifyJsonFile`:
 *
 * ```typescript
 * await modifyJsonFile("package.json", (packageJson) => ({
 *   ...packageJson,
 *   scripts: {
 *     ...toObject(packageJson["scripts"]),
 *     format: "prettier --write --ignore-path=.gitignore .",
 *     ["format:check"]: "prettier --check --ignore-path=.gitignore .",
 *   },
 * }))
 * ```
 *
 * @param value
 * @returns
 */
export const toObject = (value: unknown): Record<string, unknown> => {
  if (isUnknownObject(value)) {
    return value
  } else {
    return {}
  }
}

/**
 * `toArray` takes an unknown variable, `array` and returns `array` if it's an array, or `[]` otherwise.
 * This makes it possible to spread a nullable array, for example in combination with `modifyJsonFile`:
 *
 * ```typescript
 * await modifyJsonFile(".eslintrc.json", (eslintrc) => ({
 *   ...eslintrc,
 *   extends: [
 *     ...toArray(eslintrc["extends"]),
 *     "eslint-config-prettier",
 *   ],
 * }))
 * ```
 *
 * @param value
 * @returns value if it's an array, or `[]` otherwise.
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

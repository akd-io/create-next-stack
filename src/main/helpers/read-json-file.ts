import { promises as fs } from "fs"
import { isUnknownObject, UnknownObject } from "./is-unknown-object"

export const readJsonFile = async (path: string): Promise<UnknownObject> => {
  const jsonString = await fs.readFile(path, "utf8")
  const jsonObject = JSON.parse(jsonString)

  if (!isUnknownObject(jsonObject)) {
    throw new TypeError("Expected json object to be an object.")
  }

  return jsonObject
}

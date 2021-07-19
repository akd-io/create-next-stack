import { promises as fs } from "fs"

export const writeJsonFile = async (fileName: string, object: object) => {
  const objectString = JSON.stringify(object, null, 2)
  await fs.writeFile(fileName, objectString)
}

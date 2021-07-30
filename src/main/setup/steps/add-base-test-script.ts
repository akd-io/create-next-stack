import { isUnknownObject } from "../../helpers/is-unknown-object"
import { readJsonFile } from "../../helpers/read-json-file"
import { writeJsonFile } from "../../helpers/write-json-file"
import { Step } from "../step"

export const addBaseTestScriptStep: Step = {
  description: "adding base test script",

  shouldRun: async () => true,

  didRun: false,

  run: async () => {
    const packageJsonFilePath = "package.json"
    const packageJson = await readJsonFile(packageJsonFilePath)

    if (!isUnknownObject(packageJson.scripts)) {
      throw new TypeError("Expected packageJson.scripts to be an object.")
    }

    packageJson.scripts.test = "echo No tests found."

    await writeJsonFile(packageJsonFilePath, packageJson)
  },
}

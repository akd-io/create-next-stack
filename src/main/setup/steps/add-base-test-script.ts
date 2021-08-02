import { modifyJsonFile, toObject } from "../../helpers/json-files"
import { Step } from "../step"

export const addBaseTestScriptStep: Step = {
  description: "adding base test script",

  shouldRun: async () => true,

  didRun: false,

  run: async () => {
    await modifyJsonFile("package.json", (packageJson) => ({
      ...packageJson,
      scripts: {
        ...toObject(packageJson["scripts"]),
        test: "echo No tests found.",
      },
    }))
  },
}

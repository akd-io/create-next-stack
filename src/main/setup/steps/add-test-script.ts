import { modifyJsonFile, toObject } from "../../helpers/io"
import { Step } from "../step"

export const addTestScriptStep: Step = {
  description: "adding test script",

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

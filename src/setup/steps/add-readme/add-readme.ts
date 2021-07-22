import { promises as fs } from "fs"
import { throwError } from "../../../error-handling"
import { commandInstance } from "../../../instance"
import { Step } from "../../step"
import { generateReadme } from "./generate-readme"

export const addReadmeStep: Step = {
  shouldRun: async () => true,

  run: async (inputs) => {
    const instance = commandInstance.get()
    instance.log("Adding Readme...")

    try {
      const readmeString = await generateReadme(inputs)
      await fs.writeFile("README.md", readmeString)
    } catch (error) {
      throwError("An error occurred while adding Readme.", error)
    }
  },
}

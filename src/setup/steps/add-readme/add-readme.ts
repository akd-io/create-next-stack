import fs from "fs/promises"
import { throwError } from "../../../error-handling"
import { Step } from "../../step"
import { generateReadme } from "./generate-readme"

export const addReadmeStep: Step = {
  shouldRun: () => true,

  run: async function (this, answers) {
    this.log("Adding Readme...")

    try {
      const readmeString = await generateReadme.call(this, answers)
      await fs.writeFile("README.md", readmeString)
    } catch (error) {
      throwError.call(this, "An error occurred while adding Readme.", error)
    }
  },
}

import execa from "execa"
import fs from "fs/promises"
import { throwError } from "../../error-handling"
import { isUnknownObject } from "../../helpers/is-unknown-object"
import { writeJsonFile } from "../../helpers/write-json-file"
import { techValues } from "../../questionnaire/questions/technologies"
import { Step } from "../step"

export const setUpPrettierStep: Step = {
  shouldRun: (answers) => answers.technologies.includes(techValues.prettier),

  run: async function (this) {
    this.log("Setting up Prettier...")

    try {
      await execa("yarn add --dev prettier")

      const prettierConfig = {} // Only provide overrides in this config. Not setting Prettier's defaults explicitly is preferred, so our rules will follow Prettier's defaults as much as possible.
      await writeJsonFile(".prettierrc", prettierConfig)

      // Add format NPM script to package.json
      const packageJsonString = await fs.readFile("package.json", "utf8")
      const packageJson = JSON.parse(packageJsonString)

      if (!isUnknownObject(packageJson)) {
        throw new TypeError("Expected packageJson to be an object.")
      }
      if (!isUnknownObject(packageJson.scripts)) {
        throw new TypeError("Expected packageJson.scripts to be an object.")
      }

      packageJson.scripts.format = "prettier --write --ignore-path=.gitignore ."

      await writeJsonFile("package.json", packageJson)
    } catch (error) {
      throwError.call(
        this,
        "An error occurred while setting up Prettier.",
        error
      )
    }
  },
}

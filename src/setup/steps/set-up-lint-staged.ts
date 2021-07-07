import execa from "execa"
import fs from "fs/promises"
import { throwError } from "../../error-handling"
import { isUnknownObject } from "../../helpers/is-unknown-object"
import { remove } from "../../helpers/remove"
import { writeJsonFile } from "../../helpers/write-json-file"
import {
  preCommitHookValue,
  prettierValue,
} from "../../questionnaire/questions/technologies"
import { Step } from "../step"

export const setUpLintStagedStep: Step = {
  shouldRun: (answers) => {
    return (
      answers.technologies.includes(prettierValue) &&
      answers.technologies.includes(preCommitHookValue)
    )
  },

  run: async function (this) {
    this.log("Setting up lint-staged...")

    try {
      await execa("npx mrm@2 lint-staged")
      await remove("6") // Removes the unnecessary log file (named "6") created during the previous command.

      // Override "lint-staged" configuration
      const packageJsonString = await fs.readFile("package.json", "utf8")
      const packageJson = JSON.parse(packageJsonString)

      if (!isUnknownObject(packageJson)) {
        throw new TypeError("Expected packageJson to be an object.")
      }

      packageJson["lint-staged"] = {
        "*": "prettier --write --ignore-unknown",
      }

      await writeJsonFile("package.json", packageJson)
    } catch (error) {
      throwError.call(
        this,
        "An error occurred while setting up lint-staged.",
        error
      )
    }
  },
}

import execa from "execa"
import fs from "fs/promises"
import { throwError } from "../../error-handling"
import { isUnknownObject } from "../../helpers/is-unknown-object"
import { writeJsonFile } from "../../helpers/write-json-file"
import { Step } from "../step"
import { RemoveOfficialCNAContentStep } from "./remove-official-cna-content"

export const SetupPrettierStep: Step = {
  dependencies: [RemoveOfficialCNAContentStep],

  shouldRun: function (this) {
    return true
  },

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

      packageJson.scripts.format = "prettier --write ."

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

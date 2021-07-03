import execa from "execa"
import { throwError } from "../../error-handling"
import { Step } from "../step"
import { addBaseBabelConfigStep } from "./add-base-babel-config"
import { createNextAppStep } from "./create-next-app"
import { initializeGitStep } from "./initialize-git"
import { removeOfficialCNAContentStep } from "./remove-official-cna-content"
import { setupEmotionStep } from "./setup-emotion"
import { setupLintStagedStep } from "./setup-lint-staged"
import { setupPrettierStep } from "./setup-prettier"
import { updateYarnStep } from "./update-yarn"

export const formatProjectStep: Step = {
  dependencies: [
    setupLintStagedStep,
    setupEmotionStep,
    addBaseBabelConfigStep,
    setupPrettierStep,
    removeOfficialCNAContentStep,
    initializeGitStep,
    createNextAppStep,
    updateYarnStep,
  ],

  shouldRun: function (this) {
    return true
  },

  run: async function (this) {
    this.log("Formatting project...")

    try {
      await execa("yarn format")
    } catch (error) {
      throwError.call(
        this,
        "An error occurred while formatting project.",
        error
      )
    }
  },
}

import execa from "execa"
import { throwError } from "../../error-handling"
import { prettierValue } from "../../questionnaire/questions/technologies"
import { Step } from "../step"

// TODO: Make formatProjectStep independent of a local install of Prettier. If Prettier was not selected, format using npx instead.
export const formatProjectStep: Step = {
  shouldRun: (answers) => answers.technologies.includes(prettierValue),

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

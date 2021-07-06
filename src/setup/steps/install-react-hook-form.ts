import execa from "execa"
import { throwError } from "../../error-handling"
import { reactHookFormValue } from "../../questionnaire/questions/technologies"
import { Step } from "../step"

export const installReactHookFormStep: Step = {
  shouldRun: (answers) => answers.technologies.includes(reactHookFormValue),

  run: async function (this) {
    this.log("Installing React Hook Form...")

    try {
      await execa("yarn add react-hook-form")
    } catch (error) {
      throwError.call(
        this,
        "An error occurred while installing React Hook Form.",
        error
      )
    }
  },
}

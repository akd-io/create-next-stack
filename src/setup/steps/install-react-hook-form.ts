import { throwError } from "../../error-handling"
import { techValues } from "../../questionnaire/questions/technologies"
import { installNpmPackage, packages } from "../packages"
import { Step } from "../step"

export const installReactHookFormStep: Step = {
  shouldRun: (answers) =>
    answers.technologies.includes(techValues.reactHookForm),

  run: async function (this) {
    this.log("Installing React Hook Form...")

    try {
      await installNpmPackage(packages["react-hook-form"])
    } catch (error) {
      throwError.call(
        this,
        "An error occurred while installing React Hook Form.",
        error
      )
    }
  },
}

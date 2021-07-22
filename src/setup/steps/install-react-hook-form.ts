import { throwError } from "../../error-handling"
import { commandInstance } from "../../instance"
import { techValues } from "../../questionnaire/questions/technologies"
import { packages, yarnAdd } from "../packages"
import { Step } from "../step"

export const installReactHookFormStep: Step = {
  shouldRun: (answers) =>
    answers.technologies.includes(techValues.reactHookForm),

  run: async () => {
    const instance = commandInstance.get()
    instance.log("Installing React Hook Form...")

    try {
      await yarnAdd(packages["react-hook-form"])
    } catch (error) {
      throwError("An error occurred while installing React Hook Form.", error)
    }
  },
}

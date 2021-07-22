import { throwError } from "../../error-handling"
import { commandInstance } from "../../instance"
import { techValues } from "../../questionnaire/questions/technologies"
import { packages, yarnAdd } from "../packages"
import { Step } from "../step"

export const installFormikStep: Step = {
  shouldRun: (answers) => answers.technologies.includes(techValues.formik),

  run: async () => {
    const instance = commandInstance.get()
    instance.log("Installing Formik...")

    try {
      await yarnAdd(packages.formik)
    } catch (error) {
      throwError("An error occurred while installing Formik.", error)
    }
  },
}

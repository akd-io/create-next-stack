import { throwError } from "../../error-handling"
import { techValues } from "../../questionnaire/questions/technologies"
import { installNpmPackage, packages } from "../packages"
import { Step } from "../step"

export const installFramerMotionStep: Step = {
  shouldRun: (answers) =>
    answers.technologies.includes(techValues.framerMotion),

  run: async function (this) {
    this.log("Installing Framer Motion...")

    try {
      await installNpmPackage(packages["framer-motion"])
    } catch (error) {
      throwError.call(
        this,
        "An error occurred while installing Framer Motion.",
        error
      )
    }
  },
}

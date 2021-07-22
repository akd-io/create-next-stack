import { throwError } from "../../error-handling"
import { commandInstance } from "../../instance"
import { techValues } from "../../questionnaire/questions/technologies"
import { packages, yarnAdd } from "../packages"
import { Step } from "../step"

export const installFramerMotionStep: Step = {
  shouldRun: (answers) =>
    answers.technologies.includes(techValues.framerMotion),

  run: async () => {
    const instance = commandInstance.get()
    instance.log("Installing Framer Motion...")

    try {
      await yarnAdd(packages["framer-motion"])
    } catch (error) {
      throwError("An error occurred while installing Framer Motion.", error)
    }
  },
}

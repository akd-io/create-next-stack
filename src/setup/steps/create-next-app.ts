import execa from "execa"
import { throwError } from "../../error-handling"
import { Step } from "../step"
import { UpdateYarnStep } from "./update-yarn"

export const CreateNextAppStep: Step = {
  dependencies: [UpdateYarnStep],

  shouldRun: function (this) {
    return true
  },

  run: async function (this, answers) {
    this.log("Creating Next.js app...")

    try {
      await execa(`yarn create next-app ${answers.projectName} --typescript`)
    } catch (error) {
      throwError.call(
        this,
        "An error occurred while creating Next.js app.",
        error
      )
    }

    process.chdir(answers.projectName)
  },
}

import execa from "execa"
import { throwError } from "../../error-handling"
import { Step } from "../step"

export const initializeGitStep: Step = {
  shouldRun: () => true,

  run: async function (this) {
    this.log("Initializing Git...")

    try {
      await execa("git init")
    } catch (error) {
      throwError.call(this, "An error occurred while initializing Git.", error)
    }
  },
}

import execa from "execa"
import { throwError } from "../../error-handling"
import { Step } from "../step"
import { CreateNextAppStep } from "./create-next-app"

export const InitializeGitStep: Step = {
  dependencies: [CreateNextAppStep],

  shouldRun: function (this) {
    return true
  },

  run: async function (this) {
    this.log("Initializing Git...")

    try {
      await execa("git init")
    } catch (error) {
      throwError.call(this, "An error occurred while initializing Git.", error)
    }
  },
}

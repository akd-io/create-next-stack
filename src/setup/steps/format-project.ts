import execa from "execa"
import { throwError } from "../../error-handling"
import { Step } from "../step"

export const formatProjectStep: Step = {
  shouldRun: function (this) {
    return true
  },

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

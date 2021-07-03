import execa from "execa"
import { throwError } from "../../error-handling"
import { Step } from "../step"

export const updateYarnStep: Step = {
  dependencies: [],

  shouldRun: function (this) {
    return true
  },

  run: async function (this) {
    this.log("Updating Yarn...")

    try {
      await execa("npm i -g yarn")
    } catch (error) {
      throwError.call(this, "An error occurred while updating Yarn.", error)
    }
  },
}

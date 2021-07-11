import execa from "execa"
import { throwError } from "../../error-handling"
import { packages } from "../packages"
import { Step } from "../step"

export const updateYarnStep: Step = {
  shouldRun: () => true,

  run: async function (this) {
    this.log("Updating Yarn...")

    try {
      await execa(`npm i -g ${packages.yarn}`)
    } catch (error) {
      throwError.call(this, "An error occurred while updating Yarn.", error)
    }
  },
}

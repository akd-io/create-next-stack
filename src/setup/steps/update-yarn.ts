import execa from "execa"
import { throwError } from "../../error-handling"
import { commandInstance } from "../../instance"
import { getNameVersionCombo, packages } from "../packages"
import { Step } from "../step"

export const updateYarnStep: Step = {
  shouldRun: () => true,

  run: async () => {
    const instance = commandInstance.get()
    instance.log("Updating Yarn...")

    try {
      await execa("npm", ["i", "-g", getNameVersionCombo(packages.yarn)])
    } catch (error) {
      throwError("An error occurred while updating Yarn.", error)
    }
  },
}

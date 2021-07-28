import execa from "execa"
import { exitWithError } from "../../helpers/exit-with-error"
import { commandInstance } from "../../instance"
import { getNameVersionCombo, packages } from "../packages"
import { Step } from "../step"

export const updateYarnStep: Step = {
  shouldRun: async (inputs) => inputs.flags["package-manager"] === "yarn",

  didRun: false,

  run: async () => {
    const instance = commandInstance.get()
    instance.log("Updating Yarn...")

    try {
      await execa("npm", ["i", "-g", getNameVersionCombo(packages.yarn)])
    } catch (error) {
      exitWithError("An error occurred while updating Yarn.", error)
    }
  },
}

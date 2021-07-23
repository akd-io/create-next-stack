import { exitWithError } from "../../helpers/exit-with-error"
import { commandInstance } from "../../instance"
import { packages, yarnAdd } from "../packages"
import { Step } from "../step"

export const installFormikStep: Step = {
  shouldRun: async ({ flags }) => Boolean(flags.formik),

  run: async () => {
    const instance = commandInstance.get()
    instance.log("Installing Formik...")

    try {
      await yarnAdd(packages.formik)
    } catch (error) {
      exitWithError("An error occurred while installing Formik.", error)
    }
  },
}

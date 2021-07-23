import { exitWithError } from "../../helpers/exit-with-error"
import { commandInstance } from "../../instance"
import { install, packages } from "../packages"
import { Step } from "../step"

export const installFormikStep: Step = {
  shouldRun: async ({ flags }) => Boolean(flags.formik),

  run: async ({ flags }) => {
    const instance = commandInstance.get()
    instance.log("Installing Formik...")

    try {
      await install(packages.formik, flags["package-manager"])
    } catch (error) {
      exitWithError("An error occurred while installing Formik.", error)
    }
  },
}

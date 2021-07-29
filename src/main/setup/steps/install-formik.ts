import { install, packages } from "../packages"
import { Step } from "../step"

export const installFormikStep: Step = {
  description: "installing Formik",

  shouldRun: async ({ flags }) => Boolean(flags.formik),

  didRun: false,

  run: async ({ flags }) => {
    await install(packages.formik, flags["package-manager"])
  },
}

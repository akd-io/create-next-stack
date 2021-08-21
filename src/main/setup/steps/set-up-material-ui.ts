import { install, packages } from "../packages"
import { Step } from "../step"

export const setUpMaterialUIStep: Step = {
  description: "setting up Material UI",

  shouldRun: async ({ flags }) => Boolean(flags["material-ui"]),

  didRun: false,

  run: async ({ flags }) => {
    await install(
      [packages["@material-ui/core"], packages["@material-ui/icons"]],
      flags["package-manager"]
    )
  },
}

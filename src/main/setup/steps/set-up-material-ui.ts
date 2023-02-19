import { install, packages } from "../packages"
import { Step } from "../step"

export const setUpMaterialUIStep: Step = {
  description: "setting up Material UI",

  shouldRun: async ({ flags }) => Boolean(flags["material-ui"]),

  didRun: false,

  run: async ({ flags }) => {
    await install(packages["@mui/material"], flags["package-manager"])
    if (flags.styling === "styled-components") {
      await install(packages["@mui/styled-engine-sc"], flags["package-manager"])
    }
  },
}

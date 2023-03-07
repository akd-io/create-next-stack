import { install, packages } from "../packages"
import { Step } from "../step"

export const setUpStyledComponentsStep: Step = {
  description: "setting up Styled Components",

  shouldRun: async ({ flags }) => flags.styling === "styled-components",

  didRun: false,

  run: async ({ flags }) => {
    await install(packages["styled-components"], flags["package-manager"])
    await install(
      packages["@types/styled-components"],
      flags["package-manager"],
      { dev: true }
    )
  },
}

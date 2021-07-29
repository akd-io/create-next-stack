import { install, packages } from "../packages"
import { Step } from "../step"

export const setUpCssModulesWithSassStep: Step = {
  description: "setting up CSS Modules with Sass",

  shouldRun: async ({ flags }) => flags.styling === "css-modules-with-sass",

  didRun: false,

  run: async ({ flags }) => {
    await install(packages.sass, flags["package-manager"])
  },
}

import execa from "execa"
import { getNameVersionCombo, packages } from "../packages"
import { Step } from "../step"

export const updateYarnStep: Step = {
  description: "updating Yarn",

  shouldRun: async ({ flags }) => flags["package-manager"] === "yarn",

  didRun: false,

  run: async () => {
    await execa("npm", ["i", "-g", getNameVersionCombo(packages.yarn)])
  },
}

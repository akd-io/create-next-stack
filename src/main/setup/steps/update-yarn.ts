import { Step } from "../../plugin"
import { yarnPlugin } from "../../plugins/yarn"
import { runCommand } from "../../run-command"
import { getNameVersionCombo } from "../packages"

export const updateYarnStep: Step = {
  description: "updating Yarn",

  shouldRun: async ({ flags }) => flags["package-manager"] === "yarn",

  run: async () => {
    await runCommand("npm", [
      "i",
      "-g",
      getNameVersionCombo(yarnPlugin.dependencies.yarn),
    ])
  },
}

import { constrain } from "../../helpers/constrain"
import { Step } from "../../plugin"
import { prettierPlugin } from "../../plugins/prettier"
import { runCommand } from "../../run-command"
import { getNameVersionCombo } from "../packages"

export const formatProjectStep = constrain<Step>()({
  description: "formatting project",
  run: async () => {
    await runCommand("npx", [
      getNameVersionCombo(prettierPlugin.devDependencies.prettier),
      "--write",
      ".",
    ])
  },
})

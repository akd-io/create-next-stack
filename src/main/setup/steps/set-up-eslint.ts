import { constrain } from "../../helpers/constrain"
import { Step } from "../../plugin"
import { runCommand } from "../../run-command"

export const setUpEslintStep = constrain<Step>()({
  description: "setting up ESLint",
  run: async ({ flags }) => {
    await runCommand(flags["package-manager"], ["run", "lint", "--strict"])
  },
})

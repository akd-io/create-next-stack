import { runCommand } from "../../run-command"
import { Step } from "../step"

export const setUpEslintStep: Step = {
  description: "setting up ESLint",

  shouldRun: async () => true,

  didRun: false,

  run: async ({ flags }) => {
    await runCommand(flags["package-manager"], ["run", "lint", "--strict"])
  },
}

import execa from "execa"
import { Step } from "../step"

export const setUpEslintStep: Step = {
  description: "setting up ESLint",

  shouldRun: async () => true,

  didRun: false,

  run: async ({ flags }) => {
    await execa(flags["package-manager"], ["run", "lint", "--strict"])
  },
}

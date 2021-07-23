import { exitWithError } from "../../helpers/exit-with-error"
import { commandInstance } from "../../instance"
import { install, packages } from "../packages"
import { Step } from "../step"

export const installReactHookFormStep: Step = {
  shouldRun: async (inputs) => Boolean(inputs.flags["react-hook-form"]),

  run: async ({ flags }) => {
    const instance = commandInstance.get()
    instance.log("Installing React Hook Form...")

    try {
      await install(packages["react-hook-form"], flags["package-manager"])
    } catch (error) {
      exitWithError(
        "An error occurred while installing React Hook Form.",
        error
      )
    }
  },
}

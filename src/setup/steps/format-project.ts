import execa from "execa"
import { throwError } from "../../error-handling"
import { commandInstance } from "../../instance"
import { getNameVersionCombo, packages } from "../packages"
import { Step } from "../step"

export const formatProjectStep: Step = {
  shouldRun: async () => true,

  run: async () => {
    const instance = commandInstance.get()
    instance.log("Formatting project...")

    try {
      await execa("npx", [
        getNameVersionCombo(packages.prettier),
        "--write",
        ".",
      ])
    } catch (error) {
      throwError("An error occurred while formatting project.", error)
    }
  },
}

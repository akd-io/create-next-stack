import execa from "execa"
import { throwError } from "../../error-handling"
import { getNameVersionCombo, packages } from "../packages"
import { Step } from "../step"

export const formatProjectStep: Step = {
  shouldRun: () => true,

  run: async function (this) {
    this.log("Formatting project...")

    try {
      await execa("npx", [
        getNameVersionCombo(packages.prettier),
        "--write",
        ".",
      ])
    } catch (error) {
      throwError.call(
        this,
        "An error occurred while formatting project.",
        error
      )
    }
  },
}

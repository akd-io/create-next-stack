import console from "console"
import { isGitInitialized } from "../../helpers/is-git-initialized"
import { Step } from "../step"

export const printGitInitializationWarningStep: Step = {
  shouldRun: async () => {
    return !isGitInitialized()
  },

  run: async () => {
    console.log(
      "Warning: Git was not initialized by Create Next App. This can happen for a number of reasons. Most commonly because this repository is nested inside another repository, or because you haven't set a global name and email with git."
    )
  },
}

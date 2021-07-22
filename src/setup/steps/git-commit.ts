import execa from "execa"
import { throwError } from "../../error-handling"
import { isGitInitialized } from "../../helpers/is-git-initialized"
import { commandInstance } from "../../instance"
import { Step } from "../step"

export const gitCommitStep: Step = {
  shouldRun: () => true,

  run: async () => {
    const instance = commandInstance.get()
    try {
      if (!(await isGitInitialized())) {
        instance.log(
          "Skipping initial commit, as Git is not initialized, because this repository is nested inside another repository."
        )
        return
      }

      instance.log("Adding initial commit.")

      // Create Next App adds an initial commit. This is overridden using --amend below.
      await execa("git", ["add", "."])
      await execa("git", [
        "commit",
        "--amend",
        "-m",
        "Initial commit from Create Next Stack",
      ])
    } catch (error) {
      throwError("An error occurred while adding initial commit.", error)
    }
  },
}

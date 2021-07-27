import execa from "execa"
import { exitWithError } from "../../helpers/exit-with-error"
import { isGitInitialized } from "../../helpers/is-git-initialized"
import { commandInstance } from "../../instance"
import { Step } from "../step"

export const gitCommitStep: Step = {
  shouldRun: async () => true,

  run: async () => {
    const instance = commandInstance.get()
    try {
      if (!(await isGitInitialized())) {
        instance.log("Skipping initial commit, as Git was not initialized.")
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
      exitWithError("An error occurred while adding initial commit.", error)
    }
  },
}

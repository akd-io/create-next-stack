import { constrain } from "../../helpers/constrain"
import { isGitInitialized } from "../../helpers/is-git-initialized"
import { logWarning } from "../../logging"
import { Step } from "../../plugin"
import { runCommand } from "../../run-command"

export const gitCommitStep = constrain<Step>()({
  description: "adding initial commit",

  shouldRun: async () => {
    if (!(await isGitInitialized())) {
      logWarning("Skipping initial commit, as Git was not initialized.")
      return false
    }
    return true
  },

  run: async () => {
    // Create Next App adds an initial commit. This is overridden using --amend below.
    await runCommand("git", ["add", "."])
    await runCommand("git", [
      "commit",
      "--amend",
      "-m",
      "Initial commit from Create Next Stack",
    ])
  },
})

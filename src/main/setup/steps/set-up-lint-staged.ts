import { isGitInitialized } from "../../helpers/is-git-initialized"
import { modifyJsonFile } from "../../helpers/io"
import { remove } from "../../helpers/remove"
import { logWarning } from "../../logging"
import { runCommand } from "../../run-command"
import { install, packages, uninstall } from "../packages"
import { Step } from "../step"

export const setUpLintStagedStep: Step = {
  description: "setting up lint-staged",

  shouldRun: async ({ flags }) => {
    if (!flags.prettier || !flags["formatting-pre-commit-hook"]) {
      return false
    }

    if (!(await isGitInitialized())) {
      logWarning("Skipping lint-staged setup, as Git was not initialized.")
      return false
    }

    return true
  },

  didRun: false,

  run: async ({ flags }) => {
    const temporaryPackages = [packages.mrm, packages["mrm-task-lint-staged"]]

    // Temporarily install packages
    await install(temporaryPackages, flags["package-manager"], {
      dev: true,
    })

    // Set up lint-staged using mrm
    await runCommand("npx", ["mrm", "lint-staged"])

    // Remove the unnecessary log file (named "7") created by `mrm lint-staged`
    await remove("7")

    // Remove temporary packages
    await uninstall(temporaryPackages, flags["package-manager"])

    // Override "lint-staged" configuration
    await modifyJsonFile("package.json", (packageJson) => ({
      ...packageJson,
      "lint-staged": {
        "*": "prettier --write --ignore-unknown",
      },
    }))
  },
}

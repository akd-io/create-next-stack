import execa from "execa"
import { isGitInitialized } from "../../helpers/is-git-initialized"
import { readJsonFile } from "../../helpers/read-json-file"
import { remove } from "../../helpers/remove"
import { writeJsonFile } from "../../helpers/write-json-file"
import { logWarning } from "../../logging"
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
    await execa("npx", ["mrm", "lint-staged"])

    // Remove the unnecessary log file (named "6") created by `mrm lint-staged`
    await remove("6")

    // Remove temporary packages
    await uninstall(temporaryPackages, flags["package-manager"])

    // Override "lint-staged" configuration
    const packageJsonFilePath = "package.json"
    const packageJson = await readJsonFile(packageJsonFilePath)

    packageJson["lint-staged"] = {
      "*": "prettier --write --ignore-unknown",
    }

    await writeJsonFile(packageJsonFilePath, packageJson)
  },
}

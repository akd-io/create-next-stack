import execa from "execa"
import { promises as fs } from "fs"
import { exitWithError } from "../../helpers/exit-with-error"
import { isGitInitialized } from "../../helpers/is-git-initialized"
import { isPackageGloballyInstalled } from "../../helpers/is-package-globally-installed"
import { isUnknownObject } from "../../helpers/is-unknown-object"
import { remove } from "../../helpers/remove"
import { writeJsonFile } from "../../helpers/write-json-file"
import { commandInstance } from "../../instance"
import { getNameVersionCombo, packages } from "../packages"
import { Step } from "../step"

export const setUpLintStagedStep: Step = {
  shouldRun: async (inputs) => {
    if (!inputs.flags.prettier || !inputs.flags["formatting-pre-commit-hook"]) {
      return false
    }

    if (!(await isGitInitialized())) {
      const instance = commandInstance.get()
      instance.log(
        "Skipping lint-staged setup, as Git is not initialized, because this repository is nested inside another repository."
      )
      return false
    }

    return true
  },

  run: async () => {
    const instance = commandInstance.get()
    try {
      instance.log("Setting up lint-staged...")

      /*
        Check if mrm and mrm-task-lint-staged is installed globally already. (If they are not, we need to remove them again later)

        As isPackageGloballyInstalled has false positives is some corner cases,
        this can result in mrm or mrm-task-lint-staged being left behind installed after setup.
        This is very unlikely in this specific case though, as these packages are unlikely to be installed by other packages.
      */
      const mrmInstalledPreviouslyPromise = isPackageGloballyInstalled(
        packages.mrm.name
      )
      const mrmTaskLintStagedInstalledPreviouslyPromise =
        isPackageGloballyInstalled(packages["mrm-task-lint-staged"].name)

      const [mrmInstalledPreviously, mrmTaskLintStagedInstalledPreviously] =
        await Promise.all([
          mrmInstalledPreviouslyPromise,
          mrmTaskLintStagedInstalledPreviouslyPromise,
        ])

      // Install packages
      const mrmPackageWithVersion = getNameVersionCombo(packages.mrm)
      const mrmTaskLintStagedPackageWithVersion = getNameVersionCombo(
        packages["mrm-task-lint-staged"]
      )
      await execa("npm", [
        "install",
        "-g",
        mrmPackageWithVersion,
        mrmTaskLintStagedPackageWithVersion,
      ])

      // Set up lint-staged using mrm
      await execa("mrm", ["lint-staged"])

      // Remove the unnecessary log file (named "6") created by `mrm lint-staged`
      await remove("6")

      // Remove global packages not installed previous to running create-next-stack
      const npmUninstallArgs = ["uninstall", "-g"]
      if (!mrmInstalledPreviously) {
        npmUninstallArgs.push(packages.mrm.name)
      }
      if (!mrmTaskLintStagedInstalledPreviously) {
        npmUninstallArgs.push(packages["mrm-task-lint-staged"].name)
      }
      await execa("npm", npmUninstallArgs)

      // Override "lint-staged" configuration
      const packageJsonString = await fs.readFile("package.json", "utf8")
      const packageJson = JSON.parse(packageJsonString)

      if (!isUnknownObject(packageJson)) {
        throw new TypeError("Expected packageJson to be an object.")
      }

      packageJson["lint-staged"] = {
        "*": "prettier --write --ignore-unknown",
      }

      await writeJsonFile("package.json", packageJson)
    } catch (error) {
      exitWithError("An error occurred while setting up lint-staged.", error)
    }
  },
}

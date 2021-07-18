import execa from "execa"
import fs from "fs/promises"
import { throwError } from "../../error-handling"
import { isGitInitialized } from "../../helpers/is-git-initialized"
import { isPackageGloballyInstalled } from "../../helpers/is-package-globally-installed"
import { isUnknownObject } from "../../helpers/is-unknown-object"
import { remove } from "../../helpers/remove"
import { writeJsonFile } from "../../helpers/write-json-file"
import { techValues } from "../../questionnaire/questions/technologies"
import { getQuotedNameVersionCombo, packages } from "../packages"
import { Step } from "../step"

export const setUpLintStagedStep: Step = {
  shouldRun: (answers) => {
    return (
      answers.technologies.includes(techValues.prettier) &&
      answers.technologies.includes(techValues.preCommitHook)
    )
  },

  run: async function (this) {
    try {
      if (!(await isGitInitialized())) {
        this.log(
          "Skipping lint-staged setup, as Git is not initialized, because this repository is nested inside another repository."
        )
        return
      }

      this.log("Setting up lint-staged...")

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
      const mrmPackageWithVersion = getQuotedNameVersionCombo(packages.mrm)
      const mrmTaskLintStagedPackageWithVersion = getQuotedNameVersionCombo(
        packages["mrm-task-lint-staged"]
      )
      await execa(
        `npm install -g ${mrmPackageWithVersion} ${mrmTaskLintStagedPackageWithVersion}`
      )

      // Set up lint-staged using mrm
      await execa(`mrm lint-staged`)

      // Remove the unnecessary log file (named "6") created by `mrm lint-staged`
      await remove("6")

      // Remove global packages not installed previous to running create-next-stack
      const uninstallPromises = []
      if (!mrmInstalledPreviously) {
        uninstallPromises.push(execa(`npm uninstall -g ${packages.mrm.name}`))
      }
      if (!mrmTaskLintStagedInstalledPreviously) {
        uninstallPromises.push(
          execa(`npm uninstall -g ${packages["mrm-task-lint-staged"].name}`)
        )
      }
      await Promise.all(uninstallPromises)

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
      throwError.call(
        this,
        "An error occurred while setting up lint-staged.",
        error
      )
    }
  },
}

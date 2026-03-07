import chalk from "chalk"
import type { ValidCNSInputs } from "../create-next-stack-types.ts"
import { getProjectNameOfPath } from "../helpers/get-project-name-of-path.ts"
import { isGitInitialized } from "../helpers/is-git-initialized.ts"
import { runCommandMap } from "../helpers/package-manager-utils.ts"
import { logInfo, logWarning } from "../logging.ts"

export const printFinalMessages = ({ args, flags }: ValidCNSInputs): void => {
  if (!isGitInitialized()) {
    logWarning(
      "Git was not initialized by Create Next App. This can happen for a number of reasons. Most commonly because this repository is nested inside another repository, or because you haven't set a global name and email with git.",
    )
  }
  logInfo("")
  logInfo(
    chalk.green(
      `Successfully created project ${getProjectNameOfPath(args.app_name)}!`,
    ),
  )
  logInfo("")
  logInfo("To get started, run:")
  logInfo("")
  if (args.app_name !== ".") {
    logInfo(chalk.cyan(`    cd ${args.app_name}`))
  }
  logInfo(chalk.cyan(`    ${runCommandMap[flags["package-manager"]]} dev`))
  logInfo("")
}

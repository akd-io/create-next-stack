import chalk from "chalk"
import { ValidCNSInputs } from "../create-next-stack-types"
import { getProjectNameOfPath } from "../helpers/get-project-name-of-path"
import { isGitInitialized } from "../helpers/is-git-initialized"
import { logInfo, logWarning } from "../logging"

export const printFinalMessages = ({ args, flags }: ValidCNSInputs): void => {
  if (!isGitInitialized()) {
    logWarning(
      "Git was not initialized by Create Next App. This can happen for a number of reasons. Most commonly because this repository is nested inside another repository, or because you haven't set a global name and email with git."
    )
  }
  logInfo("")
  logInfo(
    chalk.green(
      `Successfully created project ${getProjectNameOfPath(args.appName)}!`
    )
  )
  logInfo("")
  logInfo("To get started, run:")
  logInfo("")
  if (args.appName !== ".") {
    logInfo(chalk.cyan(`    cd ${args.appName}`))
  }
  logInfo(
    chalk.cyan(
      `    ${flags["package-manager"] === "yarn" ? "yarn dev" : "npm run dev"}`
    )
  )
  logInfo("")
}

import endent from "endent"
import { ValidCNSInputs } from "../create-next-stack-types"
import { getProjectNameOfPath } from "../helpers/get-project-name-of-path"
import { isGitInitialized } from "../helpers/is-git-initialized"
import { logInfo, logWarning } from "../logging"

export const printFinalMessages = ({ args, flags }: ValidCNSInputs) => {
  if (!isGitInitialized()) {
    logWarning(
      "Git was not initialized by Create Next App. This can happen for a number of reasons. Most commonly because this repository is nested inside another repository, or because you haven't set a global name and email with git."
    )
  }
  logInfo("")
  logInfo(endent`
    Successfully created project ${getProjectNameOfPath(args.appName)}!

    To get started, run:
  `)
  logInfo("")
  if (args.appName !== ".") {
    logInfo(`    cd ${args.appName}`)
  }
  logInfo(
    `    ${flags["package-manager"] === "yarn" ? "yarn dev" : "npm run dev"}`
  )
  logInfo("")
}

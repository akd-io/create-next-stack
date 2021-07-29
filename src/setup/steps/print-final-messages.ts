import { getProjectNameOfPath } from "../../helpers/get-project-name-of-path"
import { isGitInitialized } from "../../helpers/is-git-initialized"
import { logInfo, logWarning } from "../../logging"
import { Step } from "../step"

export const printFinalMessagesStep: Step = {
  description: "printing final messages",

  shouldRun: async () => true,

  didRun: false,

  run: async ({ args, flags }) => {
    if (!isGitInitialized()) {
      logWarning(
        "Git was not initialized by Create Next App. This can happen for a number of reasons. Most commonly because this repository is nested inside another repository, or because you haven't set a global name and email with git."
      )
    }
    logInfo(``)
    logInfo(
      `Successfully created project ${getProjectNameOfPath(args.appName)}!`
    )
    logInfo(``)
    logInfo(`To get started, run:`)
    logInfo(``)
    if (args.appName !== ".") {
      logInfo(`    cd ${args.appName}`)
    }
    logInfo(
      `    ${flags["package-manager"] === "yarn" ? "yarn" : "npm run"} dev`
    )
    logInfo(``)
  },
}

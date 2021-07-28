import { getProjectNameOfPath } from "../../helpers/get-project-name-of-path"
import { isGitInitialized } from "../../helpers/is-git-initialized"
import { commandInstance } from "../../instance"
import { Step } from "../step"

export const printFinalMessagesStep: Step = {
  description: "printing final messages",

  shouldRun: async () => true,

  didRun: false,

  run: async ({ args, flags }) => {
    const instance = commandInstance.get()
    if (!isGitInitialized()) {
      instance.log(
        "Warning: Git was not initialized by Create Next App. This can happen for a number of reasons. Most commonly because this repository is nested inside another repository, or because you haven't set a global name and email with git."
      )
    }
    instance.log(``)
    instance.log(
      `Successfully created project ${getProjectNameOfPath(args.appName)}!`
    )
    instance.log(``)
    instance.log(`To get started, run:`)
    instance.log(``)
    if (args.appName !== ".") {
      instance.log(`    cd ${args.appName}`)
    }
    instance.log(
      `    ${flags["package-manager"] === "yarn" ? "yarn" : "npm run"} dev`
    )
    instance.log(``)
  },
}

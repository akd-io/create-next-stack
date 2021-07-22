import { getProjectNameOfPath } from "../../helpers/get-project-name-of-path"
import { commandInstance } from "../../instance"
import { Step } from "../step"

export const printSuccessMessageStep: Step = {
  shouldRun: async () => true,

  run: async ({ args }) => {
    const instance = commandInstance.get()
    instance.log(``)
    instance.log(
      `Successfully created project ${getProjectNameOfPath(args.appName)}!`
    )
    instance.log(``)
    instance.log(`To get started, run:`)
    instance.log(``)
    instance.log(`    cd ${args.appName}`)
    instance.log(`    yarn dev`)
    instance.log(``)
  },
}

import { commandInstance } from "../../instance"
import { Step } from "../step"

export const printSuccessMessageStep: Step = {
  shouldRun: () => true,

  run: async (answers) => {
    const instance = commandInstance.get()
    instance.log(``)
    instance.log(`Successfully created project ${answers.projectName}!`)
    instance.log(``)
    instance.log(`To get started, run:`)
    instance.log(``)
    instance.log(`    cd ${answers.projectPath}`)
    instance.log(`    yarn dev`)
    instance.log(``)
  },
}

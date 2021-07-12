import { Step } from "../step"

export const printSuccessMessageStep: Step = {
  shouldRun: () => true,

  run: async function (this, answers) {
    this.log(``)
    this.log(`Successfully created project ${answers.projectName}!`)
    this.log(``)
    this.log(`To get started, run:`)
    this.log(``)
    this.log(`    cd ${answers.projectPath}`)
    this.log(`    yarn dev`)
    this.log(``)
  },
}

import { Command, flags } from "@oclif/command"
import { performQuestionnaire } from "./questionnaire/questionnaire"
import { performSetupSteps } from "./setup/setup"

class Boil extends Command {
  static description =
    "Boil is an opinionated interactive CLI tool to easily set up the boilerplate of a new frontend project."

  static flags = {
    help: flags.help({ char: "h" }),
    version: flags.version({ char: "v" }),
  }

  async run() {
    this.parse(Boil)

    const answers = await performQuestionnaire.call(this)

    await performSetupSteps.call(this, answers)

    this.log(`Successfully created project ${answers.projectName}`)
  }
}

export = Boil

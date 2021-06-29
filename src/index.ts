import { Command, flags } from "@oclif/command"
import { performQuestionnaire } from "./questionnaire/questionnaire"
import { performSetupSteps } from "./setup/setup"

class Boil extends Command {
  static description =
    "Boil is an opinionated interactive CLI tool to easily set up the boilerplate of a new frontend project."

  static flags = {
    help: flags.help({ char: "h" }),
    version: flags.version({ char: "v" }),
    debug: flags.boolean({
      description: "show verbose error messages for debugging purposes",
    }),
  }

  async run() {
    const { flags } = this.parse(Boil)

    if (flags.debug) process.env.DEBUG = "true"

    const answers = await performQuestionnaire.call(this)

    await performSetupSteps.call(this, answers)

    this.log(`Successfully created project ${answers.projectName}.`)
  }
}

export = Boil

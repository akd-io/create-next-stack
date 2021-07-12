import { Command, flags } from "@oclif/command"
import { performQuestionnaire } from "./questionnaire/questionnaire"
import { performSetupSteps } from "./setup/setup"

class CreateNextStack extends Command {
  static description =
    "Create Next Stack is an opinionated interactive CLI tool to easily set up the boilerplate of a new Next.js app."

  static flags = {
    help: flags.help({ char: "h" }),
    version: flags.version({ char: "v" }),
    debug: flags.boolean({
      description: "show verbose error messages for debugging purposes",
    }),
  }

  async run() {
    const { flags } = this.parse(CreateNextStack)

    if (flags.debug) process.env.DEBUG = "true"

    const answers = await performQuestionnaire.call(this)

    await performSetupSteps.call(this, answers)
  }
}

export = CreateNextStack

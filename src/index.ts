import { Command, flags } from "@oclif/command"
import { throwError } from "./error-handling"
import { isUnknownObject } from "./helpers/is-unknown-object"
import { performQuestionnaire } from "./questionnaire/questionnaire"
import { performSetupSteps } from "./setup/setup"

class CreateNextStack extends Command {
  static description =
    "Create Next Stack is an opinionated interactive CLI tool to easily set up the boilerplate of a new Next.js app."

  static args = [
    {
      name: "appName",
      description: `The name of your app, optionally including a path prefix. Eg.: "my-app" or "path/to/my-app"`,
      required: false,
    },
  ]

  static flags = {
    help: flags.help({ char: "h" }),
    version: flags.version({ char: "v" }),
    debug: flags.boolean({
      description: "show verbose error messages for debugging purposes",
    }),
  }

  async run() {
    const { args, flags } = this.parse(CreateNextStack)

    if (!isUnknownObject(args)) {
      throwError.call(
        this,
        "An error occurred during create-next-stack command initialization.",
        new TypeError("Expected args to be an object.")
      )
    }

    if (flags.debug) process.env.DEBUG = "true"

    const answers = await performQuestionnaire.call(this, args)

    await performSetupSteps.call(this, answers)

    this.log(``)
    this.log(`Successfully created project ${answers.projectName}!`)
    this.log(``)
    this.log(`To get started, run:`)
    this.log(``)
    this.log(`    cd ${answers.projectPath}`)
    this.log(`    yarn dev`)
    this.log(``)
  }
}

export = CreateNextStack

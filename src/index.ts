import { Command, flags } from "@oclif/command"
import {
  CreateNextStackArgs,
  CreateNextStackFlags,
  validateArgs,
  validateFlags,
  writablePackageManagerOptions,
  writableStylingOptions,
} from "./create-next-stack-types"
import { exitWithError } from "./helpers/exit-with-error"
import { commandInstance } from "./instance"
import { performArgsQuestionnaire } from "./questionnaire/args-questionnaire"
import { performFlagsQuestionnaire } from "./questionnaire/flags-questionnaire"
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
    // General flags
    help: flags.help({
      char: "h",
      description: "Shows the CLI help information.",
    }),
    version: flags.version({
      char: "v",
      description: "Shows the CLI version information.",
    }),
    debug: flags.boolean({
      description: "Show verbose error messages for debugging purposes.",
    }),

    // Package manager:
    "package-manager": flags.enum({
      options: writablePackageManagerOptions,
      description: "Sets the preferred package manager.",
    }),

    // Formatting:
    prettier: flags.boolean({
      description: "Adds Prettier. (Code formatting)",
    }),

    // Styling:
    styling: flags.enum({
      options: writableStylingOptions,
      description: "Sets the preferred styling method.",
    }),

    // Form libraries:
    "react-hook-form": flags.boolean({
      description: "Adds React Hook Form. (Form library)",
    }),
    formik: flags.boolean({
      description: "Adds Formik. (Form library)",
    }),

    // Animation
    "framer-motion": flags.boolean({
      description: "Adds Framer Motion. (Animation library)",
    }),

    // Formatting pre-commit hook
    "formatting-pre-commit-hook": flags.boolean({
      description: "Adds a formatting pre-commit hook.",
      dependsOn: ["prettier"],
    }),
  }

  async run() {
    const { args: weaklyTypedArgs, flags: weaklyTypedFlags } =
      this.parse(CreateNextStack)

    commandInstance.set(this)

    const args = weaklyTypedArgs as CreateNextStackArgs
    const flags = weaklyTypedFlags as CreateNextStackFlags

    if (flags.debug) process.env.DEBUG = "true"

    const interactive = shouldBeInteractive(flags)

    if (interactive) {
      const validArgs = await performArgsQuestionnaire(args)
      const validFlags = await performFlagsQuestionnaire()
      await performSetupSteps({ args: validArgs, flags: validFlags })
    } else {
      if (!validateArgs(args)) {
        process.exit(1) // This tells TypeScript that the throwError function exits, and lets it infer types correctly below.
      }
      if (!validateFlags(flags)) {
        exitWithError(
          'Outside interactive Mode, you are required to specify a styling method. Read about the "--styling" option using --help.'
        )
        process.exit(1) // This tells TypeScript that the throwError function exits, and lets it infer types correctly below.
      }

      await performSetupSteps({ args, flags })
    }
  }
}

const shouldBeInteractive = (flags: CreateNextStackFlags): boolean => {
  const numOfAllFlags = Object.keys(flags).length

  let numOfNonGeneralFlags = numOfAllFlags
  if (flags.debug !== undefined) numOfNonGeneralFlags--

  return numOfNonGeneralFlags === 0
}

export = CreateNextStack

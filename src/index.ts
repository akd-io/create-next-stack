import { Command, flags } from "@oclif/command"
import {
  CreateNextStackArgs,
  CreateNextStackFlags,
  ValidCreateNextStackArgs,
  ValidCreateNextStackFlags,
  writableStylingOptions,
} from "./create-next-stack-types"
import { throwError } from "./error-handling"
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
      description: "Show verbose error messages for debugging purposes",
    }),

    /* TODO: Add support for NPM
    // Package manager:
    "package-manager": flags.enum({
      options: ["yarn", "npm"],
      description: "Sets the preferred package manager. (Recommended: yarn)",
    }),
    */

    // Formatting:
    prettier: flags.boolean({
      description: "(R) Adds Prettier. (Code formatting)",
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
      description: "(R) Adds a formatting pre-commit hook.",
    }),
  }

  async run() {
    const { args: weaklyTypedArgs, flags: weaklyTypedFlags } =
      this.parse(CreateNextStack)

    let args = weaklyTypedArgs as CreateNextStackArgs
    let flags = weaklyTypedFlags as CreateNextStackFlags

    if (flags.debug) process.env.DEBUG = "true"

    if (shouldBeInteractive(flags)) {
      if (args.appName == null) {
        args = await performArgsQuestionnaire.call(this)
      }
      flags = await performFlagsQuestionnaire.call(this)
    }

    if (!validateArgs(args)) {
      throwError.call(
        this,
        'The non-interactive CLI requires you to specify a name for your application. Read about the "appName" argument using --help.'
      )
      process.exit(1) // This tells TypeScript that the throwError function exits, and lets it infer types correctly below.
    }

    if (!validateFlags(flags)) {
      throwError.call(
        this,
        'The non-interactive CLI requires you to specify a styling method. Read about the "--styling" flag using --help.'
      )
      process.exit(1) // This tells TypeScript that the throwError function exits, and lets it infer types correctly below.
    }

    await performSetupSteps.call(this, args, flags)
  }
}

const shouldBeInteractive = (flags: CreateNextStackFlags): boolean => {
  const numOfAllFlags = Object.keys(flags).length

  let numOfNonGeneralFlags = numOfAllFlags
  if (flags.debug !== undefined) numOfNonGeneralFlags--

  return numOfNonGeneralFlags === 0
}

const validateArgs = (
  args: CreateNextStackArgs
): args is ValidCreateNextStackArgs => {
  return typeof args.appName === "string"
}

const validateFlags = (
  flags: CreateNextStackFlags
): flags is ValidCreateNextStackFlags => {
  return flags.styling != null
}

export = CreateNextStack

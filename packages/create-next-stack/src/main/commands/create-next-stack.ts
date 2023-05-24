import { Args, Command, Flags } from "@oclif/core"
import { commandInstance } from "../command-instance"
import {
  validateArgs,
  validateFlags,
  writablePackageManagerOptions,
  writableStylingOptions,
} from "../create-next-stack-types"
import { exitWithError } from "../helpers/exit-with-error"
import { performSetupSteps } from "../setup/setup"

export default class CreateNextStack extends Command {
  static usage = "[APP_NAME] [FLAGS]" // Without "create-next-stack" as OCLIF adds this, even though this is a single command CLI.

  static args = {
    app_name: Args.string({
      description: `The name of your app, optionally including a path prefix. Eg.: "my-app" or "path/to/my-app"`,
      required: true,
    }),
  }

  static flags = {
    // General flags
    help: Flags.help({
      char: "h",
      description: "Shows the CLI help information.",
    }),
    version: Flags.version({
      char: "v",
      description: "Shows the CLI version information.",
    }),
    debug: Flags.boolean({
      description: "Show verbose error messages for debugging purposes.",
    }),

    // Package manager:
    "package-manager": Flags.string({
      required: true,
      options: writablePackageManagerOptions,
      description: "Sets the preferred package manager. (Required)",
    }),

    // Formatting:
    prettier: Flags.boolean({
      description: "Adds Prettier. (Code formatting)",
    }),

    // Styling:
    styling: Flags.string({
      required: true,
      options: writableStylingOptions,
      description: `Sets the preferred styling method. (Required) <styling-method> = ${writableStylingOptions.join(
        "|"
      )}`,
      helpValue: "<styling-method>",
    }),

    // Component libraries:
    chakra: Flags.boolean({
      description:
        "Adds Chakra UI. (Component library) (Requires Emotion and Framer Motion)",
    }),

    "material-ui": Flags.boolean({
      description: "Adds Material UI. (Component library)",
    }),

    // Form libraries:
    "react-hook-form": Flags.boolean({
      description: "Adds React Hook Form. (Form library)",
    }),
    formik: Flags.boolean({
      description: "Adds Formik. (Form library)",
    }),

    // Animation
    "framer-motion": Flags.boolean({
      description: "Adds Framer Motion. (Animation library)",
    }),

    // Continuous integration
    "github-actions": Flags.boolean({
      description: "Adds a GitHub Actions continuous integration workflow.",
    }),

    // Formatting pre-commit hook
    "formatting-pre-commit-hook": Flags.boolean({
      description: "Adds a formatting pre-commit hook. (Requires Prettier)",
    }),

    // Icons
    "react-icons": Flags.boolean({
      description: "Adds React Icons. (Icon library)",
    }),
  }

  async run(): Promise<void> {
    commandInstance.set(this)

    try {
      const { args, flags } = await this.parse(CreateNextStack)

      if (flags.debug) process.env["DEBUG"] = "true"

      if (!validateArgs(args)) {
        process.exit(1) // This tells TypeScript that this block is unreachable. validateArgs(args) either throws or returns true.
      }
      if (!validateFlags(flags)) {
        process.exit(1) // This tells TypeScript that this block is unreachable. validateFlags(flags) either throws or returns true.
      }

      await performSetupSteps({ args, flags })
    } catch (error) {
      exitWithError(error)
    }
  }
}

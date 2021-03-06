import { ValidCNSInputs } from "../../../create-next-stack-types"
import { setUpLintStagedStep } from "../set-up-lint-staged"
import { setUpPrettierStep } from "../set-up-prettier"

export const generateScriptTableRows = async (
  inputs: ValidCNSInputs
): Promise<string> => {
  type ScriptTableRow = {
    name: string
    description: string
    filter: boolean
  }

  const scripts: ScriptTableRow[] = [
    {
      name: /* md */ `\`dev\``,
      description: /* md */ `Runs the Next.js development server.`,
      filter: true,
    },
    {
      name: /* md */ `\`build\``,
      description: /* md */ `Generates a production build.`,
      filter: true,
    },
    {
      name: /* md */ `\`start\``,
      description: /* md */ `Runs the Next.js production server built using \`build\` script.`,
      filter: true,
    },
    {
      name: /* md */ `\`lint\``,
      description: /* md */ `Runs [ESLint](https://eslint.org/) to catch linting errors in the source code.`,
      filter: true,
    },
    {
      name: /* md */ `\`format\``,
      description: /* md */ `Formats all source code in the project.`,
      filter: setUpPrettierStep.didRun,
    },
    {
      name: /* md */ `\`format:check\``,
      description: /* md */ `Checks the formatting of all code in the project.`,
      filter: setUpPrettierStep.didRun,
    },
    {
      name: /* md */ `\`prepare\``,
      description: /* md */ `The [\`prepare\` life cycle script](https://docs.npmjs.com/cli/v7/using-npm/scripts#life-cycle-scripts) is used to set up Git pre-commit hooks when people run \`${
        inputs.flags["package-manager"] === "yarn" ? "yarn" : "npm"
      } install\`. This script should not be run manually.`,
      filter: setUpLintStagedStep.didRun,
    },
  ]

  const scriptRowsString = scripts
    .filter((script) => script.filter)
    .map((script) => `|${script.name}|${script.description}|`)
    .join("\n")

  return scriptRowsString
}

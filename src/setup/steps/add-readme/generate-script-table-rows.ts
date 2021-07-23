import { ValidCNSInputs } from "../../../create-next-stack-types"
import { setUpLintStagedStep } from "../set-up-lint-staged"
import { setUpPrettierStep } from "../set-up-prettier"

export const generateScriptTableRows = async (
  inputs: ValidCNSInputs
): Promise<string> => {
  type ScriptTableRow = {
    name: string
    description: string
    filter?: boolean
  }

  const scripts: ScriptTableRow[] = [
    {
      name: /* md */ `\`dev\``,
      description: /* md */ `Runs the Next.js development server.`,
    },
    {
      name: /* md */ `\`build\``,
      description: /* md */ `Generates a production build.`,
    },
    {
      name: /* md */ `\`start\``,
      description: /* md */ `Runs the Next.js production server built using \`build\` script.`,
    },
    {
      name: /* md */ `\`lint\``,
      description: /* md */ `Runs [ESLint](https://eslint.org/) to catch linting errors in the source code.`,
    },
    {
      name: /* md */ `\`format\``,
      description: /* md */ `Formats all source code in the project.`,
      filter: await setUpPrettierStep.shouldRun(inputs),
    },
    {
      name: /* md */ `\`format:check\``,
      description: /* md */ `Checks the formatting of all code in the project.`,
      filter: await setUpPrettierStep.shouldRun(inputs),
    },
    {
      name: /* md */ `\`prepare\``,
      description: /* md */ `The [\`prepare\` life cycle script](https://docs.npmjs.com/cli/v7/using-npm/scripts#life-cycle-scripts) is used to set up Git pre-commit hooks when people run \`${
        inputs.flags["package-manager"] === "yarn" ? "yarn" : "npm"
      } install\`. This script should not be run manually.`,
      filter: await setUpLintStagedStep.shouldRun(inputs),
    },
  ]

  const scriptRowsString = scripts
    .filter((script) =>
      typeof script.filter !== "undefined" ? script.filter : true
    )
    .map((script) => `|${script.name}|${script.description}|`)
    .join("\n")

  return scriptRowsString
}

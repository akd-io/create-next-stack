import Command from "@oclif/command"
import { isGitInitialized } from "../../../helpers/is-git-initialized"
import { QuestionnaireAnswers } from "../../../questionnaire/questionnaire"
import { setUpLintStagedStep } from "../set-up-lint-staged"
import { setUpPrettierStep } from "../set-up-prettier"

export async function generateScriptTableRows(
  this: Command,
  answers: QuestionnaireAnswers
): Promise<string> {
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
      filter: setUpPrettierStep.shouldRun(answers),
    },
    {
      name: /* md */ `\`format:check\``,
      description: /* md */ `Checks the formatting of all code in the project.`,
      filter: setUpPrettierStep.shouldRun(answers),
    },
    {
      name: /* md */ `\`prepare\``,
      description: /* md */ `The [\`prepare\` life cycle script](https://docs.npmjs.com/cli/v7/using-npm/scripts#life-cycle-scripts) is used to set up Git pre-commit hooks when people run \`yarn install\`. This script should not be run manually.`,
      filter:
        (await isGitInitialized()) && setUpLintStagedStep.shouldRun(answers),
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

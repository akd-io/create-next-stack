import inquirer from "inquirer"
import { arrayToKeyToKeyMap } from "../../../helpers/array-to-key-to-key-map"
import { Technology } from "../../flags-questionnaire"

const miscellaneousValueArray = ["formattingPreCommitHook"] as const
export type MiscellaneousValue = typeof miscellaneousValueArray[number]
const miscellaneousValues = arrayToKeyToKeyMap(miscellaneousValueArray)

const answerName = "miscellaneous"
type Answers = {
  [answerName]: MiscellaneousValue[]
}

export const promptMiscellaneous = async (
  technologies: Set<Technology>
): Promise<Set<MiscellaneousValue>> => {
  const { miscellaneous } = await inquirer.prompt<Answers>({
    name: answerName,
    type: "checkbox",
    message: "Miscellaneous:",
    pageSize: 10,
    choices: [
      {
        value: miscellaneousValues.formattingPreCommitHook,
        name: "Formatting pre-commit hook (Husky & lint-staged)",
        checked: technologies.has("prettier"),
        disabled: !technologies.has("prettier"),
        short: "Formatting pre-commit hook",
      },
      // TODO: When adding more options, remove prettier-check in flags-questionnaire.ts
    ],
  })

  return new Set(miscellaneous)
}

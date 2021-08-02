import inquirer from "inquirer"
import { arrayToKeyToKeyMap } from "../../../helpers/array-to-key-to-key-map"
import { OptionalTechnology } from "../../flags-questionnaire"

const miscellaneousValueArray = ["formattingPreCommitHook"] as const
export type MiscellaneousValue = typeof miscellaneousValueArray[number]
export const miscellaneousValues = arrayToKeyToKeyMap(miscellaneousValueArray)

const answerName = "technologies"
type Answers = {
  [answerName]: MiscellaneousValue[]
}

export const promptMiscellaneous = async (
  optionalTechnologies: Set<OptionalTechnology>
): Promise<Set<MiscellaneousValue>> => {
  const { technologies } = await inquirer.prompt<Answers>({
    name: answerName,
    type: "checkbox",
    message: "Miscellaneous:",
    pageSize: 10,
    choices: [
      {
        value: "formattingPreCommitHook",
        name: "Formatting pre-commit hook (Husky & lint-staged)",
        checked: optionalTechnologies.has("prettier"),
        disabled: !optionalTechnologies.has("prettier"),
        short: "Formatting pre-commit hook",
      },
      // TODO: When adding more options, remove prettier-check in flags-questionnaire.ts
    ],
  })

  return new Set(technologies)
}

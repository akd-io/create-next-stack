import inquirer from "inquirer"
import { arrayToKeyToKeyMap } from "../../../helpers/array-to-key-to-key-map"
import { Technology } from "../../flags-questionnaire"

const formattingValuesArray = ["prettier"] as const
export type FormattingValue = typeof formattingValuesArray[number]
const formattingValues = arrayToKeyToKeyMap(formattingValuesArray)

const answerName = "formatting"
type Answers = {
  [answerName]: FormattingValue[]
}

export const promptFormatting = async (
  technologies: Set<Technology>
): Promise<FormattingValue[]> => {
  const { formatting } = await inquirer.prompt<Answers>({
    name: answerName,
    type: "checkbox",
    message: "Formatting:",
    choices: [
      {
        value: formattingValues.prettier,
        name: "Prettier",
        checked: true,
      },
    ],
  })

  return formatting
}

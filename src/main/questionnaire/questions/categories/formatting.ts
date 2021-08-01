import inquirer from "inquirer"
import { arrayToKeyToKeyMap } from "../../../helpers/array-to-key-to-key-map"

const formattingValuesArray = ["prettier"] as const
type FormattingValue = typeof formattingValuesArray[number]
const formattingValues = arrayToKeyToKeyMap(formattingValuesArray)

const answerName = "formatting"
type Answers = {
  [answerName]: FormattingValue[]
}

export const promptFormatting = async (): Promise<FormattingValue[]> => {
  const { formatting } = await inquirer.prompt<Answers>({
    name: answerName,
    type: "checkbox",
    message: "Pick your preferred formatting technology",
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

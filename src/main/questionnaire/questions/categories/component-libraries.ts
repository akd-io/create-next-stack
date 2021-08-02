import inquirer from "inquirer"
import { arrayToKeyToKeyMap } from "../../../helpers/array-to-key-to-key-map"
import { Technology } from "../../flags-questionnaire"

const componentLibraryOptions = ["chakra"] as const
export type ComponentLibraryValue = typeof componentLibraryOptions[number]
const componentLibraryValues = arrayToKeyToKeyMap(componentLibraryOptions)

const answerName = "componentLibraries"
type Answers = {
  [answerName]: ComponentLibraryValue[]
}

export const promptComponentLibraries = async (
  technologies: Set<Technology>
): Promise<ComponentLibraryValue[]> => {
  const { componentLibraries } = await inquirer.prompt<Answers>({
    name: answerName,
    type: "checkbox",
    message: "Pick your preferred component library:",
    choices: [
      {
        value: componentLibraryValues.chakra,
        name: "Chakra UI",
        checked: technologies.has("emotion"),
        disabled: !technologies.has("emotion"),
      },
    ],
  })

  return componentLibraries
}

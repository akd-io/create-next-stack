import inquirer from "inquirer"
import { arrayToKeyToKeyMap } from "../../helpers/array-to-key-to-key-map"

const categoryValuesArray = [
  "formatting",
  "formStateManagement",
  "animation",
  "continuousIntegration",
] as const
export type CategoryValue = typeof categoryValuesArray[number]
const categoryValues = arrayToKeyToKeyMap(categoryValuesArray)

// TODO: You can strengthen typings by turning the choices array into an object located here, as in technologies.ts

export const promptOptionalCategories = async (): Promise<CategoryValue[]> => {
  const answerName = "categories"
  type ProjectNameAnswers = {
    [answerName]: CategoryValue[]
  }

  const { categories } = await inquirer.prompt<ProjectNameAnswers>({
    name: answerName,
    type: "checkbox",
    message: "What categories of technologies are you looking to use?",
    choices: [
      {
        value: categoryValues.formatting,
        name: "Formatting",
        checked: true,
      },
      {
        value: categoryValues.formStateManagement,
        name: "Form state management",
        checked: true,
      },
      {
        value: categoryValues.animation,
        name: "Animation",
      },
      {
        value: categoryValues.continuousIntegration,
        name: "Continuous integration",
        checked: true,
      },
    ],
  })

  return categories
}

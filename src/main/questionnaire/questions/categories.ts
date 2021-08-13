import inquirer from "inquirer"
import { arrayToKeyToKeyMap } from "../../helpers/array-to-key-to-key-map"

const categoryValuesArray = [
  "formatting",
  "componentLibraries",
  "formStateManagement",
  "animation",
  "continuousIntegration",
] as const
export type CategoryValue = typeof categoryValuesArray[number]
const categoryValues = arrayToKeyToKeyMap(categoryValuesArray)

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
        value: categoryValues.componentLibraries,
        name: "Component libraries",
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
        checked: true,
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

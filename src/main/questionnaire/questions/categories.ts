import inquirer from "inquirer"
import { arrayToKeyToKeyMap } from "../../helpers/array-to-key-to-key-map"

const categoryValuesArray = [
  "packageManagement",
  "styling",
  "formStateManagement",
  "animation",
  "continuousIntegration",
  "formatting",
  "miscellaneous",
] as const
export type CategoryValue = typeof categoryValuesArray[number]
const categoryValues = arrayToKeyToKeyMap(categoryValuesArray)

// TODO: You can strengthen typings by turning the choices array into an object located here, as in technologies.ts

export const promptCategories = async (): Promise<CategoryValue[]> => {
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
        value: categoryValues.packageManagement,
        name: "Package management",
      },
      {
        value: categoryValues.styling,
        name: "Styling",
      },
      {
        value: categoryValues.formatting,
        name: "Formatting",
      },
      {
        value: categoryValues.animation,
        name: "Animation",
      },
      {
        value: categoryValues.continuousIntegration,
        name: "Continuous integration",
      },
      {
        value: categoryValues.formStateManagement,
        name: "Form state management",
      },
    ],
  })

  return categories
}

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

export const promptCategories = async (): Promise<Set<CategoryValue>> => {
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
        key: categoryValues.styling,
        name: "styling",
      },
      {
        key: categoryValues.packageManagement,
        name: "Package management",
      },
      {
        key: categoryValues.animation,
        name: "Animation",
      },
      {
        key: categoryValues.continuousIntegration,
        name: "Continuous integration",
      },
      {
        key: categoryValues.formStateManagement,
        name: "Form state management",
      },
      {
        key: categoryValues.formatting,
        name: "Formatting",
      },
      {
        key: categoryValues.miscellaneous,
        name: "Miscellaneous",
      },
    ],
  })

  return new Set(categories)
}

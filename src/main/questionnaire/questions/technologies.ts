import inquirer, { Separator } from "inquirer"
import { arrayToKeyToKeyMap } from "../../helpers/array-to-key-to-key-map"

const techValueArray = ["preCommitHook"] as const
export type TechValue = typeof techValueArray[number]
export const techValues = arrayToKeyToKeyMap(techValueArray)

const techChoices: {
  [K in TechValue]: {
    name: string
    value: K
    checked?: boolean
  }
} = {
  preCommitHook: {
    value: "preCommitHook",
    name: "Formatting pre-commit hook (Husky & lint-staged)",
    checked: true,
  },
}

const answerName = "technologies"
type TechnologiesAnswers = {
  [answerName]: TechValue[]
}

export const promptTechnologies = async (): Promise<
  TechnologiesAnswers[typeof answerName]
> => {
  const { technologies } = await inquirer.prompt<TechnologiesAnswers>({
    name: answerName,
    type: "checkbox",
    message: "What technologies are you looking to use?",
    pageSize: 10,
    choices: [new Separator("Miscellaneous:"), techChoices.preCommitHook],
    validate: () => {
      // TODO: Remember to validate preCommitHook. It requires Prettier.

      return true
    },
  })

  return technologies
}

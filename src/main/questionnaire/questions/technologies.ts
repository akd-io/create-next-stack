import inquirer, { Separator } from "inquirer"
import { arrayToKeyToKeyMap } from "../../helpers/array-to-key-to-key-map"

const techValueArray = [
  "reactHookForm",
  "formik",
  "framerMotion",
  "preCommitHook",
] as const
export type TechValue = typeof techValueArray[number]
export const techValues = arrayToKeyToKeyMap(techValueArray)

const techChoices: {
  [K in TechValue]: {
    name: string
    value: K
    checked?: boolean
  }
} = {
  reactHookForm: {
    value: "reactHookForm",
    name: "React Hook Form",
    checked: true,
  },
  formik: {
    value: "formik",
    name: "Formik",
  },
  framerMotion: {
    value: "framerMotion",
    name: "Framer Motion",
  },
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
    choices: [
      new Separator("Form state management:"),
      techChoices.reactHookForm,
      techChoices.formik,

      new Separator("Animation:"),
      techChoices.framerMotion,

      new Separator("Miscellaneous:"),
      techChoices.preCommitHook,
    ],
    validate: () => {
      // TODO: Remember to validate preCommitHook. It requires Prettier.

      return true
    },
  })

  return technologies
}

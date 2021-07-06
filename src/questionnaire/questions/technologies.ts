import inquirer, { Separator } from "inquirer"

export const prettierValue = "prettier"
export const emotionValue = "emotion"
export const preCommitHookValue = "preCommitHook"
export const reactHookFormValue = "reactHookForm"
export const formikValue = "formik"

export type TechValue =
  | typeof prettierValue
  | typeof emotionValue
  | typeof preCommitHookValue
  | typeof reactHookFormValue
  | typeof formikValue

export async function promptTechnologies() {
  const answerName = "technologies"
  type TechnologiesAnswers = {
    [answerName]: TechValue[]
  }

  const { technologies } = await inquirer.prompt<TechnologiesAnswers>({
    name: answerName,
    type: "checkbox",
    message: "What technologies are you looking to use?",
    pageSize: 10,
    choices: [
      new Separator("Formatting:"),
      {
        name: "Prettier",
        value: prettierValue,
        checked: true,
      },
      new Separator("Styling:"),
      {
        name: "Emotion",
        value: emotionValue,
        checked: true,
      },
      new Separator("Form state management:"),
      {
        name: "React Hook Form",
        value: reactHookFormValue,
        checked: true,
      },
      {
        name: "Formik",
        value: formikValue,
      },
      new Separator("Miscellaneous:"),
      {
        name: "Formatting pre-commit hook (Husky & lint-staged)",
        value: preCommitHookValue,
        checked: true,
      },
    ],
    validate: (technologies) => {
      if (
        technologies.includes(preCommitHookValue) &&
        !technologies.includes(prettierValue)
      ) {
        return "Formatting pre-commit hook (Husky & lint-staged) requires Prettier"
      }
      return true
    },
  })

  return technologies
}

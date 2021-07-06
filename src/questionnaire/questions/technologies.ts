import inquirer from "inquirer"

export const prettierValue = "prettier"
export const emotionValue = "emotion"
export const preCommitHookValue = "preCommitHook"
export const reactHookFormValue = "reactHookForm"

export type TechValue =
  | typeof prettierValue
  | typeof emotionValue
  | typeof preCommitHookValue
  | typeof reactHookFormValue

export async function promptTechnologies() {
  const answerName = "technologies"
  type TechnologiesAnswers = {
    [answerName]: TechValue[]
  }

  const { technologies } = await inquirer.prompt<TechnologiesAnswers>({
    name: answerName,
    type: "checkbox",
    message: "What technologies are you looking to use?",
    choices: [
      {
        name: "Formatting (Prettier)",
        value: prettierValue,
        checked: true,
      },
      {
        name: "CSS-in-JS (Emotion)",
        value: emotionValue,
        checked: true,
      },
      {
        name: "Pre-commit hook (Husky & lint-staged)",
        value: preCommitHookValue,
        checked: true,
      },
      {
        name: "Form library (React Hook Form)",
        value: reactHookFormValue,
        checked: true,
      },
    ],
    validate: (technologies) => {
      if (
        technologies.includes(preCommitHookValue) &&
        !technologies.includes(prettierValue)
      ) {
        return "Pre-commit hook (Husky & lint-staged) requires Formatting (Prettier)"
      }
      return true
    },
  })

  return technologies
}

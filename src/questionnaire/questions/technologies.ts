import inquirer from "inquirer"

export const prettierValue = "prettier"
export const emotionValue = "emotion"
export const lintStagedValue = "lintStaged"

export type TechValue =
  | typeof prettierValue
  | typeof emotionValue
  | typeof lintStagedValue

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
      },
      {
        name: "CSS-in-JS (Emotion)",
        value: emotionValue,
      },
      {
        name: "Pre-commit hook (Lint-staged)",
        value: lintStagedValue,
      },
    ],
  })

  return technologies
}

import inquirer from "inquirer"

const choices = ["Emotion", "styled-components"] as const
export type Choice = typeof choices[number]

export const promptStyling = async () => {
  const answerName = "styling"
  type StylingAnswers = {
    [answerName]: Choice
  }
  const { styling } = await inquirer.prompt<StylingAnswers>({
    name: answerName,
    type: "list",
    message: "What will you use for styling?",
    choices,
  })

  return styling
}

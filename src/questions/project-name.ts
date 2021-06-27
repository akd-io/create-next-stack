import inquirer from "inquirer"

const answerName = "projectName"

type ProjectNameAnswers = {
  [answerName]: string
}

export const promptProjectName = async () => {
  const { projectName } = await inquirer.prompt<ProjectNameAnswers>([
    {
      name: answerName,
      type: "input",
      message: "What is the name of your project?",
      validate: (input) => {
        return typeof input === "string" && input.length > 0
      },
    },
  ])
  return projectName
}

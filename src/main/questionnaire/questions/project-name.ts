import inquirer from "inquirer"
import { validateProjectPathInput } from "../../helpers/validate-project-path"

export const promptProjectPath = async (): Promise<string> => {
  const answerName = "projectPath"
  type ProjectNameAnswers = {
    [answerName]: string
  }

  const { projectPath } = await inquirer.prompt<ProjectNameAnswers>({
    name: answerName,
    type: "input",
    message: "What is your project named?",
    default: "my-app",
    validate: validateProjectPathInput,
  })

  return projectPath
}

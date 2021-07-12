import Command from "@oclif/command"
import inquirer from "inquirer"
import { validateProjectPathInput } from "./validate-project-path"

export async function promptProjectPath(this: Command): Promise<string> {
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

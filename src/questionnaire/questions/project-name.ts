import inquirer from "inquirer"
import path from "path"
import { validateProjectName } from "../../helpers/validate-project-name"

export const promptProjectName = async () => {
  const answerName = "projectName"
  type ProjectNameAnswers = {
    [answerName]: string
  }
  const { projectName } = await inquirer.prompt<ProjectNameAnswers>({
    name: answerName,
    type: "input",
    message: "What is your project named?",
    validate: (projectName) => {
      if (typeof projectName !== "string") return false

      const trimmedInput = projectName.trim()

      if (trimmedInput.length <= 0) return false

      return validateProjectName(projectName).valid
    },
  })

  const resolvedProjectPath = path.resolve(projectName)
  return path.basename(resolvedProjectPath)
}

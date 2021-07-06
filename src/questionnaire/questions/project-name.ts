import Command from "@oclif/command"
import inquirer from "inquirer"
import path from "path"
import { throwError } from "../../error-handling"
import { validateProjectPath } from "../../helpers/validate-project-name"

export async function promptProjectName(this: Command): Promise<{
  projectPath: string
  projectName: string
}> {
  const answerName = "projectPath"
  type ProjectNameAnswers = {
    [answerName]: string
  }

  const { projectPath } = await inquirer.prompt<ProjectNameAnswers>({
    name: answerName,
    type: "input",
    message: "What is your project named?",
    validate: (projectPath) => {
      try {
        if (typeof projectPath !== "string") {
          throw new TypeError("Expected projectPath to be a string.")
        }

        projectPath = projectPath.trim()

        const validation = validateProjectPath(projectPath)

        if (!validation.valid) {
          const firstProblem = validation.problems[0]
          if (typeof firstProblem !== "undefined") {
            return firstProblem
          }
          throw new TypeError(
            "Expected validation.problems to be a non-empty array."
          )
        }
      } catch (error) {
        throwError.call(
          this,
          "An error occurred while validating project name.",
          error
        )
      }

      return true
    },
  })

  const projectName = path.basename(path.resolve(projectPath))

  return {
    projectPath,
    projectName,
  }
}

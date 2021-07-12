import Command from "@oclif/command"
import path from "path"
import { CreateNextStackArgs } from "../create-next-stack-types"
import { throwError } from "../error-handling"
import { promptProjectPath } from "./questions/project-name"
import { promptTechnologies, TechValue } from "./questions/technologies"
import { validateProjectPathInput } from "./questions/validate-project-path"

export type QuestionnaireAnswers = {
  projectPath: string
  projectName: string
  technologies: TechValue[]
}

export async function performQuestionnaire(
  this: Command,
  args: CreateNextStackArgs
): Promise<QuestionnaireAnswers> {
  let projectPath: string | null = null

  const appNameArg = args["appName"]
  if (typeof appNameArg === "string") {
    const validationResult = validateProjectPathInput.call(this, appNameArg)
    if (validationResult === true) {
      projectPath = appNameArg
    } else {
      throwError.call(this, "Invalid project name. " + validationResult)
      process.exit() // This tells TypeScript that the throwError function exits, and lets it infer types correctly below.
    }
  } else {
    projectPath = await promptProjectPath.call(this)
  }

  const projectName = path.basename(path.resolve(projectPath))

  const technologies = await promptTechnologies()

  return {
    projectPath,
    projectName,
    technologies,
  }
}

import {
  CreateNextStackArgs,
  ValidCreateNextStackArgs,
} from "../create-next-stack-types"
import { throwError } from "../error-handling"
import { promptProjectPath } from "./questions/project-name"
import { validateProjectPathInput } from "./questions/validate-project-path"

export const performArgsQuestionnaire = async (
  args: CreateNextStackArgs
): Promise<ValidCreateNextStackArgs> => {
  let projectPath: string | null = null

  const appNameArg = args["appName"]
  if (typeof appNameArg === "string") {
    const validationResult = validateProjectPathInput(appNameArg)
    if (validationResult === true) {
      projectPath = appNameArg
    } else {
      throwError("Invalid project name. " + validationResult)
      process.exit() // This tells TypeScript that the throwError function exits, and lets it infer types correctly below.
    }
  } else {
    projectPath = await promptProjectPath()
  }

  return {
    appName: projectPath,
  }
}

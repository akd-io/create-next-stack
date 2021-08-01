import validateNpmPackageName from "validate-npm-package-name"
import { logError } from "../logging"
import { getProjectNameOfPath } from "./get-project-name-of-path"

/**
 * @param this Current Command instance
 * @param projectPath The project path the user input
 * @returns `true` if valid. If invalid, an error message of type `string` explaining the invalidity.
 */
export const validateProjectPathInput = (
  projectPath: string
): string | true => {
  try {
    const projectName = getProjectNameOfPath(projectPath)
    const validation = validateNpmName(projectName)

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
    logError("An error occurred while validating app name.")
    throw error
  }

  return true
}

/**
 * This code is a slightly modified version of the same code from the Create Next App repository.
 * From: https://github.com/vercel/next.js/blob/e8a9bd19967c9f78575faa7d38e90a1270ffa519/packages/create-next-app/helpers/validate-pkg.ts
 */
const validateNpmName = (
  name: string
): {
  valid: boolean
  problems: string[]
} => {
  const nameValidation = validateNpmPackageName(name)
  if (nameValidation.validForNewPackages) {
    return { valid: true, problems: [] }
  }

  return {
    valid: false,
    problems: [
      ...(nameValidation.errors ?? []),
      ...(nameValidation.warnings ?? []),
    ],
  }
}

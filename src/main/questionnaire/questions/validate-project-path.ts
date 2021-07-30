import { getProjectNameOfPath } from "../../helpers/get-project-name-of-path"
import { validateNpmName } from "../../helpers/validate-npm-name"
import { logError } from "../../logging"

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

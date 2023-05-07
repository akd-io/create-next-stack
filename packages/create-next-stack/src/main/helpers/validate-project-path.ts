import validateNpmPackageName from "validate-npm-package-name"
import { getProjectNameOfPath } from "./get-project-name-of-path"

/**
 * Validates a project path.
 *
 * @param projectPath The project path input by the user.
 * @returns `true` if valid. Otherwise, an error message explaining the invalidity.
 */
export const validateProjectPathInput = (
  projectPath: string
): string | true => {
  const projectName = getProjectNameOfPath(projectPath)
  const problems = getProblemsInNpmPackageName(projectName)
  return problems[0] ?? true
}

/**
 * Validates an npm package name.
 *
 * @param npmPackageName A candidate for an npm package name.
 * @returns A list of problems found in the name.
 */
const getProblemsInNpmPackageName = (npmPackageName: string): string[] => {
  const { errors, warnings } = validateNpmPackageName(npmPackageName)
  return [...(errors ?? []), ...(warnings ?? [])]
}

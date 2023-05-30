import validateNpmPackageName from "validate-npm-package-name"

/**
 * Project names must be valid npm package names. This function checks that validity.
 *
 * @param projectName A project name
 * @returns `true` if valid. If invalid, an error message of type `string` explaining the invalidity.
 */
export const validateProjectName = (projectName: string): string | true => {
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

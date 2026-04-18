import validateNpmPackageName from "validate-npm-package-name"

/**
 * Project names must be valid npm package names. This function checks that validity.
 *
 * @param projectName A project name
 * @returns `true` if valid. If invalid, an error message of type `string` explaining the invalidity.
 */
export const validateProjectName = (projectName: string): string | true => {
  const { errors, warnings } = validateNpmPackageName(projectName)
  return [...(errors ?? []), ...(warnings ?? [])][0] ?? true
}

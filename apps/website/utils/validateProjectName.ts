/**
 * Project names must be valid npm package names. This function checks that validity.
 *
 * @param projectName A project name
 * @returns `true` if valid. If invalid, an error message of type `string` explaining the invalidity.
 */
export const validateProjectName = (projectName: string): string | true => {
  const problems = getProblemsInProjectName(projectName)
  return problems[0] ?? true
}

const scopedPackagePattern = /^(?:@([^/]+?)[/])?([^/]+?)$/
const blacklist = ["node_modules", "favicon.ico"]

const getProblemsInProjectName = (name: string): string[] => {
  const problems: string[] = []

  if (name.length === 0) {
    problems.push("Name must not be empty.")
    return problems
  }

  if (name.startsWith(".")) {
    problems.push("Name must not start with a period.")
  }

  if (name.startsWith("_")) {
    problems.push("Name must not start with an underscore.")
  }

  if (name.trimStart() !== name) {
    problems.push("Name must not contain leading spaces.")
  }

  if (name.trimEnd() !== name) {
    problems.push("Name must not contain trailing spaces.")
  }

  if (name.length > 214) {
    problems.push("Name must be 214 characters or fewer.")
  }

  if (name.toLowerCase() !== name) {
    problems.push("Name must not contain uppercase letters.")
  }

  if (/[~'!()*]/.test(name.split("/").slice(-1)[0] ?? "")) {
    problems.push("Name must not contain special characters (~'!()*)")
  }

  if (encodeURIComponent(name) !== name) {
    const match = scopedPackagePattern.exec(name)
    if (match) {
      const user = match[1]
      const pkg = match[2]
      if (
        user &&
        pkg &&
        encodeURIComponent(user) === user &&
        encodeURIComponent(pkg) === pkg
      ) {
        // Scoped package name is valid
      } else {
        problems.push("Name can only contain URL-friendly characters.")
      }
    } else {
      problems.push("Name can only contain URL-friendly characters.")
    }
  }

  if (blacklist.includes(name)) {
    problems.push(`${name} is a reserved name.`)
  }

  return problems
}

import execa from "execa"

/**
 * This function finds out if a package is installed globally.
 *
 * IMPORTANT: This function is not perfect. It uses `npm list -g --depth=0 <package-name>` which checks both top-level packages and their dependencies.
 * In other words, the --depth param only limits the depth of the rendered tree, not the actual search algorithm itself.
 * This means that a search for the package `which`, for example, will not throw an error even though the package isn't installed globally.
 * As such, false positives can arise.
 *
 * In order to combat this, `isPackageGloballyInstalled` checks whether the output tree of depth 0 includes the specified package name.
 *
 * This limits the false positives to cases where some top-level package has:
 * 1. the specified package somewhere in its dependency tree, AND
 * 2. the specified package name included in its own name
 *
 * @param packageName The name of the npm package
 * @returns Whether the specified npm package is globally installed or not.
 */
export const isPackageGloballyInstalled = async (
  packageName: string
): Promise<boolean> => {
  try {
    const execaResult = await execa("npm", [
      "list",
      "-g",
      "--depth=0",
      packageName,
    ])

    if (!execaResult.stdout.includes(packageName)) {
      return false
    }
  } catch {
    return false
  }

  return true
}

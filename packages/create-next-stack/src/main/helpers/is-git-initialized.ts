import fs from "fs/promises"

/**
 * `isGitInitialized` checks if Git was initialized by Create Next App or not.
 * This is useful as some setup steps depend on Git, such as adding an initial commit, or setting up a commit hook.
 *
 * We won't initialize Git ourselves, as Create Next App does this for us.
 * Specifically, it checks if a new project is being created inside an already existing Git or Mercurial repository, and only initializes Git if that's not the case.
 * Create Next App can also fail to run other git-related commands, like `git commit`, at which point it will also delete `.git/`.
 * Therefore we can also rely on `isGitInitialized` to tell us whether a user has set up a Git name and email and a `git commit` will be possible, as Create Next App tests this implicitly.
 *
 * See Create Next App's Git-logic at time of writing here: https://github.com/vercel/next.js/blob/d60c95cb57497396d534eb8dd6fce9a192fc22fe/packages/create-next-app/helpers/git.ts#L22
 * And in canary here: https://github.com/vercel/next.js/blob/canary/packages/create-next-app/helpers/git.ts#L22
 *
 * @returns `true` or `false`, whether Git has been initialized or not
 */
export const isGitInitialized = async (): Promise<boolean> => {
  try {
    await fs.access(".git")
    return true
  } catch {
    return false
  }
}

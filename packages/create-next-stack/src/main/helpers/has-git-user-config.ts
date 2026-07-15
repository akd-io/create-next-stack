import { runCommand } from "./run-command.ts"

/**
 * `hasGitUserConfig` checks whether Git has `user.name` and `user.email` configured.
 * Without these, `git commit` will fail with an error like:
 * "Please tell me who you are" or "Author identity unknown".
 *
 * We check both `--global` and local config (in case global is unset but local exists).
 *
 * @returns `true` if both `user.name` and `user.email` are set, `false` otherwise
 */
export const hasGitUserConfig = async (): Promise<boolean> => {
  try {
    const userName = await runCommand("git", ["config", "user.name"])
    const name =
      typeof userName.stdout === "string" ? userName.stdout.trim() : ""
    if (!name) return false

    const userEmail = await runCommand("git", ["config", "user.email"])
    const email =
      typeof userEmail.stdout === "string" ? userEmail.stdout.trim() : ""
    if (!email) return false

    return true
  } catch {
    return false
  }
}

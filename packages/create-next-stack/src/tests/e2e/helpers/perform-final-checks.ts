import type { Options } from "execa"
import { runCommand } from "../../../main/helpers/run-command.ts"
import { logTestInfo } from "../test-logging.ts"

export const performFinalChecks = async (
  runDirectory: string,
  args: string[],
): Promise<void> => {
  const env = { ...process.env }
  delete env["CI"]
  delete env["GITHUB_ACTIONS"]

  const options: Options = {
    cwd: runDirectory,
    env,
  }

  logTestInfo("Checking formatting...")
  await runCommand(
    "npx",
    ["prettier", "--check", "--ignore-path=.gitignore", "."],
    options,
  )

  logTestInfo("Checking linting...")
  await runCommand("npm", ["run", "lint"], options)

  logTestInfo("Running build...")
  await runCommand("npm", ["run", "build"], options)

  const packageManager = args
    .find((arg) => arg.startsWith("--package-manager="))
    ?.split("=")[1]
  if (packageManager) {
    logTestInfo("Installing dependencies...")
    await runCommand(packageManager, ["install"], options)
  }
}

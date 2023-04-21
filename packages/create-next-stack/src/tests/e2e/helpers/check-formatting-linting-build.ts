import { Options } from "execa"
import { runCommand } from "../../../main/helpers/run-command"
import { logTestInfo } from "../test-logging"

export const checkFormattingLintingBuild = async (
  runDirectory: string
): Promise<void> => {
  const options: Options = {
    cwd: runDirectory,
  }

  logTestInfo("Checking formatting...")
  await runCommand(
    "npx",
    ["prettier", "--check", "--ignore-path=.gitignore", "."],
    options
  )

  logTestInfo("Checking linting...")
  await runCommand("npm", ["run", "lint"], options)

  logTestInfo("Running build...")
  await runCommand("npm", ["run", "build"], options)
}

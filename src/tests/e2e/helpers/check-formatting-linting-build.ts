import execa, { Options } from "execa"
import { logTestInfo } from "../test-logging"

export const checkFormattingLintingBuild = async (runDirectory: string) => {
  const options: Options = {
    cwd: runDirectory,
  }

  logTestInfo("Checking formatting...")
  await execa(
    "npx",
    ["prettier", "--check", "--ignore-path=.gitignore", "."],
    options
  )

  logTestInfo("Checking linting...")
  await execa("npm", ["run", "lint"], options)

  logTestInfo("Running build...")
  await execa("npm", ["run", "build"], options)
}

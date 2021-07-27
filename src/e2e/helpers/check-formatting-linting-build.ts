import execa, { Options } from "execa"
import { logTestInfo } from "./test-logging"

export const checkFormattingLintingBuild = async (
  packageManager: "yarn" | "npm",
  runDirectory: string
) => {
  const options: Options = {
    cwd: runDirectory,
  }

  logTestInfo("Checking formatting")
  await execa(
    "npx",
    ["prettier", "--check", "--ignore-path=.gitignore", "."],
    options
  )

  logTestInfo("Checking linting")
  await execa(packageManager, ["run", "lint"], options)

  logTestInfo("Running build")
  await execa(packageManager, ["run", "build"], options)
}

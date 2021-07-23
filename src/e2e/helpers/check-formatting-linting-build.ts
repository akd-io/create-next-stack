import console from "console"
import execa, { Options } from "execa"

export const checkFormattingLintingBuild = async (
  packageManager: "yarn" | "npm",
  runDirectory: string
) => {
  const options: Options = {
    cwd: runDirectory,
  }

  console.log("Checking formatting")
  await execa(
    "npx",
    ["prettier", "--check", "--ignore-path=.gitignore", "."],
    options
  )

  console.log("Checking linting")
  await execa(packageManager, ["run", "lint"], options)

  console.log("Running build")
  await execa(packageManager, ["run", "build"], options)
}

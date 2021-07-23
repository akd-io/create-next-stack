import console from "console"
import execa from "execa"

export const checkFormattingLintingBuild = async (
  packageManager: "yarn" | "npm"
) => {
  console.log("Checking formatting")
  await execa("npx", ["prettier", "--check", "--ignore-path=.gitignore", "."])

  console.log("Checking linting")
  await execa(packageManager, ["run", "lint"])

  console.log("Running build")
  await execa(packageManager, ["run", "build"])
}

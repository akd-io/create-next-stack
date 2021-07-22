import console from "console"
import execa from "execa"

export const checkFormattingLintingBuild = async () => {
  console.log("Checking formatting")
  await execa("npx", ["prettier", "--check", "--ignore-path=.gitignore", "."])

  console.log("Checking linting")
  await execa("yarn", ["lint"])

  console.log("Running yarn build")
  await execa("yarn", ["build"])
}

import execa from "execa"
import { exitWithError } from "./exit-with-error"
import { logTestInfo } from "./test-logging"

export const setGitNameAndEmail = async () => {
  try {
    await execa("git", ["config", "--global", "user.name"])
      .then((result) => {
        logTestInfo(`user.name found: ${result.stdout}`)
      })
      .catch(async () => {
        logTestInfo(`user.name didn't exist. Setting user.name="Test user"`)
        await execa("git", ["config", "--global", "user.name", "Test user"])
      })
    await execa("git", ["config", "--global", "user.email"])
      .then((result) => {
        logTestInfo(`user.email found: ${result.stdout}`)
      })
      .catch(async () => {
        logTestInfo(
          `user.email didn't exist. Setting user.email="test-user@create-next-stack.com"`
        )
        await execa("git", [
          "config",
          "--global",
          "user.email",
          "test-user@create-next-stack.com",
        ])
      })
  } catch (error) {
    exitWithError(error)
  }
}

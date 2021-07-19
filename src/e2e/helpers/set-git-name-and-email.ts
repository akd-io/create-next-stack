import console from "console"
import execa from "execa"
import { exitWithError } from "./exit-with-error"

export const setGitNameAndEmail = async () => {
  try {
    await execa("git", ["config", "--global", "user.name"])
      .then((result) => {
        console.log(`user.name found: ${result.stdout}`)
      })
      .catch(async () => {
        console.log(`user.name didn't exist. Setting user.name="Test user"`)
        await execa("git", ["config", "--global", "user.name", "Test user"])
      })
    await execa("git", ["config", "--global", "user.email"])
      .then((result) => {
        console.log(`user.email found: ${result.stdout}`)
      })
      .catch(async () => {
        console.log(
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

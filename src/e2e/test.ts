import console from "console"
import execa from "execa"
import util from "util"
import { testDefaultOptions } from "./tests/default-options"
;(async () => {
  try {
    // Set Git name and email, so Git commit doesn't fail during create-next-app
    await execa("git", ["config", "--global", "user.name", `"Test user"`])
    await execa("git", [
      "config",
      "--global",
      "user.email",
      `"test-user@create-next-stack.com"`,
    ])

    await testDefaultOptions()
  } catch (error) {
    if (util.types.isNativeError(error)) {
      console.error(error.message)
    } else if (typeof error === "string") {
      console.error(error)
    } else {
      console.error("Error: An error of unknown type was thrown.")
    }
    process.exit(1)
  }
})()

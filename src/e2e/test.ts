import console from "console"
import { isNativeError } from "util/types"
import { testDefaultOptions } from "./tests/default-options"
;(async () => {
  try {
    await testDefaultOptions()
  } catch (error) {
    if (isNativeError(error)) {
      console.error(error.message)
    } else if (typeof error === "string") {
      console.error(error)
    } else {
      console.error("Error: An error of unknown type was thrown.")
    }
    process.exit(1)
  }
})()

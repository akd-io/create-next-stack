import { logTestError } from "../test-logging"

export const exitWithError = async (error: unknown) => {
  if (error instanceof Error) {
    logTestError(error.message)
    if (error.stack != null) {
      logTestError("")
      logTestError(error.stack)
    }
  } else {
    logTestError("An unknown error occurred.")
  }

  process.exit(1)
}

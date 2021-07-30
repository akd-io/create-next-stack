import { logTestError } from "../test-logging"

export const exitWithError = async (error: unknown): Promise<never> => {
  if (error instanceof Error) {
    if (error.stack != null) {
      logTestError(error.stack)
    }
  } else {
    logTestError("An unknown error occurred.")
  }

  process.exit(1)
}

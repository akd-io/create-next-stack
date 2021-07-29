import { logError } from "../logging"

export const exitWithError = (error: unknown): never => {
  if (error instanceof Error) {
    logError(error.message)
    if (error.stack != null) {
      logError("")
      logError(error.stack)
    }
  } else {
    logError("An unknown error occurred.")
  }

  if (process.env.DEBUG == null) {
    logError("")
    logError("Note: Debugging logs can be enabled with the --debug flag.")
  }

  process.exit(1)
}

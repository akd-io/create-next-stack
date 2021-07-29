import { logError } from "../logging"
import { inDebugMode } from "./is-debug-enabled"

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

  if (!inDebugMode()) {
    logError("")
    logError("Note: Debugging logs can be enabled with the --debug flag.")
  }

  process.exit(1)
}

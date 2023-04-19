import { ExitError } from "@oclif/errors"
import { logError } from "../logging"
import { inDebugMode } from "./in-debug-mode"

export const exitWithError = (error: unknown): never => {
  if (error instanceof ExitError && error.oclif.exit === 0) {
    process.exit(0)
  } else if (error instanceof Error) {
    if (error.stack != null) {
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

import { PrettyPrintableError } from "@oclif/errors"
import { commandInstance } from "../instance"

type Options = {
  code?: string
  exit?: number
} & PrettyPrintableError

export const exitWithError = (
  friendlyErrorMessage: string,
  error?: unknown,
  options: Options = {
    suggestions: [],
    exit: 1,
  }
): never => {
  const command = commandInstance.get()

  if (process.env.DEBUG === "true" && error != null) {
    if (error instanceof Error) {
      command.error(error.message)
    } else if (typeof error === "string") {
      command.error(error)
    } else {
      command.error("Error: An error object of unknown type was thrown.")
    }
  }

  if (process.env.DEBUG !== "true") {
    if (options.suggestions == null) options.suggestions = []
    options.suggestions.push(
      "For greater insight, try to run your command again using the --debug flag."
    )
  }

  command.error(friendlyErrorMessage, options)
  process.exit(1)
}

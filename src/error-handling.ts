import { PrettyPrintableError } from "@oclif/errors"
import { commandInstance } from "./instance"

type Options = {
  code?: string
  exit?: number
} & PrettyPrintableError

export const throwError = (
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
      command.log(error.message)
    } else if (typeof error === "string") {
      command.log(error)
    } else {
      command.log("Error: An error object of unknown type was thrown.")
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

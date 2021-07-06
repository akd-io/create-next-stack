import Command from "@oclif/command"
import { PrettyPrintableError } from "@oclif/errors"

type Options = {
  code?: string
  exit?: number
} & PrettyPrintableError

export function throwError(
  this: Command,
  friendlyErrorMessage: string,
  error?: unknown,
  options: Options = {
    suggestions: [],
    exit: 1,
  }
): never {
  if (process.env.DEBUG === "true" && error != null) {
    if (error instanceof Error) {
      this.log(error.message)
    } else if (typeof error === "string") {
      this.log(error)
    } else {
      this.log("Error: An error object of unknown type was thrown.")
    }
  }

  if (process.env.DEBUG !== "true") {
    if (options.suggestions == null) options.suggestions = []
    options.suggestions.push(
      "For greater insight, try to run your command again using the --debug flag."
    )
  }

  this.error(friendlyErrorMessage, options)
}

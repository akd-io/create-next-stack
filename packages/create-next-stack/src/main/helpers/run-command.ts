import { execa, type Options, type ResultPromise } from "execa"
import { logDebug } from "../logging.ts"
import { prettyCommand } from "./pretty-command.ts"

export const runCommand = (
  file: string,
  args: string[],
  options?: Options,
): ResultPromise => {
  logDebug("Running command:", prettyCommand(file, args))
  logDebug("Running command in:", options?.cwd?.toString() ?? process.cwd())
  return execa(file, args, options)
}

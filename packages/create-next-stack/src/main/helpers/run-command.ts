import { execa, type Options, type ResultPromise } from "execa"
import { fileURLToPath } from "url"
import { logDebug } from "../logging.ts"
import { prettyCommand } from "./pretty-command.ts"

export const runCommand = (
  file: string,
  args: string[],
  options?: Options,
): ResultPromise => {
  logDebug("Running command:", prettyCommand(file, args))
  const cwd = options?.cwd ?? process.cwd()
  logDebug(
    "Running command in:",
    typeof cwd === "string" ? cwd : fileURLToPath(cwd),
  )
  return execa(file, args, options)
}

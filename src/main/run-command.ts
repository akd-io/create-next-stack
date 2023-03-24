import execa, { ExecaChildProcess, Options } from "execa"
import { prettyCommand } from "./helpers/pretty-command"
import { logDebug } from "./logging"

export const runCommand = (
  file: string,
  args: string[],
  options?: Options
): ExecaChildProcess<string> => {
  logDebug("Running command:", prettyCommand(file, args))
  return execa(file, args, options)
}

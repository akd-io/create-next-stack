import execa, { ExecaChildProcess, Options } from "execa"
import { logDebug } from "../logging"
import { prettyCommand } from "./pretty-command"

export const runCommand = (
  file: string,
  args: string[],
  options?: Options
): ExecaChildProcess<string> => {
  logDebug("Running command:", prettyCommand(file, args))
  return execa(file, args, options)
}

import execa, { ExecaChildProcess, Options } from "execa"
import { logDebug } from "./logging"

export const runCommand = (
  file: string,
  args: string[],
  options?: Options
): ExecaChildProcess<string> => {
  logDebug("Running command:", [file, ...args].join(" "))
  return execa(file, args, options)
}

import chalk from "chalk"
import { inDebugMode } from "./helpers/is-debug-enabled"
import { prefixLines } from "./helpers/prefix-lines"

const infoPrefix = chalk.cyan("info ")
const debugPrefix = chalk.white("debug ")
const warningPrefix = chalk.yellow("warning ")
const errorPrefix = chalk.red("error ")

export const logInfo = (str: string) => {
  console.info(prefixLines(infoPrefix, chalk.white(str)))
}

export const logDebug = (str: string) => {
  if (inDebugMode()) {
    console.debug(prefixLines(debugPrefix, chalk.white(str)))
  }
}

export const logWarning = (str: string) => {
  console.warn(prefixLines(warningPrefix, chalk.yellow(str)))
}

export const logError = (str: string) => {
  console.error(prefixLines(errorPrefix, chalk.red(str)))
}

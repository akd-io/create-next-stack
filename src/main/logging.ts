import chalk from "chalk"
import { inDebugMode } from "./helpers/is-debug-enabled"
import { prefixLines } from "./helpers/prefix-lines"

const infoPrefix = chalk.cyan("info ")
const debugPrefix = chalk.white("debug ")
const warningPrefix = chalk.yellow("warning ")
const errorPrefix = chalk.red("error ")

export const logInfo = (str: string): void => {
  console.info(prefixLines(infoPrefix, chalk.white(str)))
}

export const logDebug = (str: string): void => {
  if (inDebugMode()) {
    console.debug(prefixLines(debugPrefix, chalk.white(str)))
  }
}

export const logWarning = (str: string): void => {
  console.warn(prefixLines(warningPrefix, chalk.yellow(str)))
}

export const logError = (str: string): void => {
  console.error(prefixLines(errorPrefix, chalk.red(str)))
}

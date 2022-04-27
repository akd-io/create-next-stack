import chalk from "chalk"
import { inDebugMode } from "./helpers/in-debug-mode"
import { prefixLines } from "./helpers/prefix-lines"

const infoPrefix = chalk.cyan("info ")
const debugPrefix = chalk.white("debug ")
const warningPrefix = chalk.yellow("warning ")
const errorPrefix = chalk.red("error ")

export const logInfo = (...strings: string[]): void => {
  console.info(prefixLines(infoPrefix, chalk.white(strings.join(" "))))
}

export const logDebug = (...strings: string[]): void => {
  if (inDebugMode()) {
    console.debug(prefixLines(debugPrefix, chalk.white(strings.join(" "))))
  }
}

export const logWarning = (...strings: string[]): void => {
  console.warn(prefixLines(warningPrefix, chalk.yellow(strings.join(" "))))
}

export const logError = (...strings: string[]): void => {
  console.error(prefixLines(errorPrefix, chalk.red(strings.join(" "))))
}

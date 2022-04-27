import chalk from "chalk"
import { prefixLines } from "../../main/helpers/prefix-lines"

const testPrefix = chalk.magenta("test ")

const testInfoPrefix = testPrefix + chalk.cyan("info ")
const testWarningPrefix = testPrefix + chalk.yellow("warning ")
const testErrorPrefix = testPrefix + chalk.red("error ")

export const logTestInfo = (...strings: string[]): void => {
  console.info(prefixLines(testInfoPrefix, chalk.white(strings)))
}

export const logTestWarning = (...strings: string[]): void => {
  console.warn(prefixLines(testWarningPrefix, chalk.yellow(strings)))
}

export const logTestError = (...strings: string[]): void => {
  console.error(prefixLines(testErrorPrefix, chalk.red(strings)))
}

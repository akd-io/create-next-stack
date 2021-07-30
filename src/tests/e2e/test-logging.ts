import chalk from "chalk"
import { prefixLines } from "../../main/helpers/prefix-lines"

const testPrefix = chalk.magenta("test ")

const testInfoPrefix = testPrefix + chalk.cyan("info ")
const testWarningPrefix = testPrefix + chalk.yellow("warning ")
const testErrorPrefix = testPrefix + chalk.red("error ")

export const logTestInfo = (str: string): void => {
  console.info(prefixLines(testInfoPrefix, chalk.white(str)))
}

export const logTestWarning = (str: string): void => {
  console.warn(prefixLines(testWarningPrefix, chalk.yellow(str)))
}

export const logTestError = (str: string): void => {
  console.error(prefixLines(testErrorPrefix, chalk.red(str)))
}

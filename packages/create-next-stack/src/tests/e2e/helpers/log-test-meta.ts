import chalk from "chalk"
import { logTestInfo } from "../test-logging"

export const logTestMeta = (testName: string, testFilePath: string): void => {
  logTestInfo(chalk.yellow`Running test: ${testName}`)
  logTestInfo(`Test file path: ${testFilePath}`)
}

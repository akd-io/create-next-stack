import { prefixLines } from "../helpers/prefix-lines"

const testInfoPrefix = "[TEST INFO] "
const testDebugPrefix = "[TEST DEBUG] "
const testWarningPrefix = "[TEST WARNING] "
const testErrorPrefix = "[TEST ERROR] "

export const logTestInfo = (str: string) => {
  console.info(prefixLines(testInfoPrefix, str))
}

export const logTestDebug = (str: string) => {
  console.debug(prefixLines(testDebugPrefix, str))
}

export const logTestWarning = (str: string) => {
  console.warn(prefixLines(testWarningPrefix, str))
}

export const logTestError = (str: string) => {
  console.error(prefixLines(testErrorPrefix, str))
}

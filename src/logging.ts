import { prefixLines } from "./helpers/prefix-lines"

const infoPrefix = "[INFO] "
const debugPrefix = "[DEBUG] "
const warningPrefix = "[WARNING] "
const errorPrefix = "[ERROR] "

export const logInfo = (str: string) => {
  console.info(prefixLines(infoPrefix, str))
}

export const logDebug = (str: string) => {
  console.debug(prefixLines(debugPrefix, str))
}

export const logWarning = (str: string) => {
  console.warn(prefixLines(warningPrefix, str))
}

export const logError = (str: string) => {
  console.error(prefixLines(errorPrefix, str))
}

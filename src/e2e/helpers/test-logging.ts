import console from "console"
import { prefixLines } from "../../helpers/prefix-lines"

export const logTestInfo = (str: string) => {
  console.log(prefixLines("[TEST INFO] ", str))
}

export const logTestWarning = (str: string) => {
  console.log(prefixLines("[TEST WARNING] ", str))
}

export const logTestError = (str: string) => {
  console.error(prefixLines("[TEST ERROR] ", str))
}

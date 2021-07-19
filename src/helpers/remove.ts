import rimraf from "rimraf"
import { promisify } from "util"

const rm = promisify(rimraf)

export const remove = (path: string): Promise<void> => {
  return rm(path)
}

import rimraf from "rimraf"
import { promisify } from "util"

export const remove = promisify(rimraf)

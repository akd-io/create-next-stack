import { promises as fs } from "fs"
import { remove } from "../../../helpers/remove"
import { Step } from "../../step"
import { baseBabelConfigString } from "./add-base-babel-config"

export const removeBaseBabelConfigStep: Step = {
  description: "removing default Babel configuration",

  shouldRun: async () => {
    const babelConfig = await fs.readFile(".babelrc")
    return babelConfig.toString() === baseBabelConfigString
  },

  didRun: false,

  run: async () => {
    await remove(".babelrc")
  },
}

import { promises as fs } from "fs"
import { Step } from "../../step"

const baseBabelConfig = {
  presets: [["next/babel", {}]],
  plugins: [],
}
export const baseBabelConfigString = JSON.stringify(baseBabelConfig, null, 2)

export const addBaseBabelConfigStep: Step = {
  description: "adding custom Babel configuration",

  shouldRun: async () => true,

  didRun: false,

  run: async () => {
    // The base Babel config is ready for custom preset configurations to be added onto the `next/babel` preset as per the Next.js docs: https://nextjs.org/docs/advanced-features/customizing-babel-config
    await fs.writeFile(".babelrc", baseBabelConfigString)
  },
}

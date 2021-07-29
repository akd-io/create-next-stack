import { writeJsonFile } from "../../helpers/write-json-file"
import { Step } from "../step"

export const addBaseBabelConfigStep: Step = {
  description: "adding custom Babel configuration",

  shouldRun: async () => true,

  didRun: false,

  run: async () => {
    // The base Babel config is ready for custom preset configurations to be added onto the `next/babel` preset as per the Next.js docs: https://nextjs.org/docs/advanced-features/customizing-babel-config
    const baseBabelConfig = {
      presets: [["next/babel", {}]],
      plugins: [],
    }

    await writeJsonFile(".babelrc", baseBabelConfig)
  },
}

import { exitWithError } from "../../helpers/exit-with-error"
import { writeJsonFile } from "../../helpers/write-json-file"
import { commandInstance } from "../../instance"
import { Step } from "../step"

export const addBaseBabelConfigStep: Step = {
  shouldRun: async () => true,

  didRun: false,

  run: async () => {
    const instance = commandInstance.get()
    instance.log("Adding custom Babel configuration...")

    // The base Babel config is ready for custom preset configurations to be added onto the `next/babel` preset as per the Next.js docs: https://nextjs.org/docs/advanced-features/customizing-babel-config
    const baseBabelConfig = {
      presets: [["next/babel", {}]],
      plugins: [],
    }

    try {
      await writeJsonFile(".babelrc", baseBabelConfig)
    } catch (error) {
      exitWithError(
        "An error occurred while adding custom Babel configuration.",
        error
      )
    }
  },
}

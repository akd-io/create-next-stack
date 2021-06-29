import Command from "@oclif/command"
import fs from "fs/promises"
import { throwError } from "../../error-handling"

export async function addBaseBabelConfig(this: Command): Promise<void> {
  this.log("Adding custom Babel configuration...")

  // The base Babel config is ready for custom preset configurations to be added onto the `next/babel` preset as per the Next.js docs: https://nextjs.org/docs/advanced-features/customizing-babel-config
  const baseBabelConfig = {
    presets: [["next/babel", {}]],
    plugins: [],
  }

  try {
    await fs.writeFile(".babelrc", JSON.stringify(baseBabelConfig))
  } catch (error) {
    throwError.call(
      this,
      "An error occurred while adding custom Babel configuration.",
      error
    )
  }
}

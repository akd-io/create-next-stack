import endent from "endent"
import { constrain } from "../helpers/constrain"
import { writeFile } from "../helpers/io"
import { isGitInitialized } from "../helpers/is-git-initialized"
import { logWarning } from "../logging"
import { Plugin } from "../plugin"

const filename = ".gitattributes"

export const gitAttributesPlugin = constrain<Plugin>()({
  name: "Git Attributes",
  description: `Adds a ${filename} file to normalize end of line`,
  steps: {
    addGitAttributes: {
      description: `adding ${filename}`,

      shouldRun: async () => {
        if (!(await isGitInitialized())) {
          logWarning(`Skipping ${filename} setup, as Git was not initialized.`)
          return false
        }
        return true
      },

      run: async () => {
        await writeFile(
          filename,
          endent`
            # Normalize end of line. Read more about why in the links below:
            # https://prettier.io/docs/en/options.html#end-of-line
            # https://git-scm.com/docs/gitattributes#_effects
            * text=auto eol=lf
          `
        )
      },
    },
  },
} as const)

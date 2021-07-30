import endent from "endent"
import { promises as fs } from "fs"
import { isGitInitialized } from "../../helpers/is-git-initialized"
import { logWarning } from "../../logging"
import { Step } from "../step"

const filename = ".gitattributes"

export const addGitAttributesStep: Step = {
  description: `adding ${filename}`,

  shouldRun: async () => {
    if (!(await isGitInitialized())) {
      logWarning(`Skipping ${filename} setup, as Git was not initialized.`)
      return false
    }
    return true
  },

  didRun: false,

  run: async () => {
    await fs.writeFile(filename, generateGitAttributes())
  },
}

const generateGitAttributes = (): string => {
  return endent`
    # Normalize end of line. Read more about why in the links below:
    # https://prettier.io/docs/en/options.html#end-of-line
    # https://git-scm.com/docs/gitattributes#_effects
    * text=auto eol=lf
  `
}

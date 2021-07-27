import endent from "endent"
import { promises as fs } from "fs"
import { exitWithError } from "../../helpers/exit-with-error"
import { isGitInitialized } from "../../helpers/is-git-initialized"
import { commandInstance } from "../../instance"
import { Step } from "../step"

const filename = ".gitattributes"

export const addGitAttributesStep: Step = {
  shouldRun: async () => true,

  run: async () => {
    const instance = commandInstance.get()

    try {
      if (!(await isGitInitialized())) {
        instance.log(
          `Skipping ${filename} setup, as Git is not initialized, because this repository is nested inside another repository.`
        )
        return
      }

      instance.log(`Adding ${filename}...`)

      await fs.writeFile(filename, generateGitAttributes())
    } catch (error) {
      exitWithError(`An error occurred while adding ${filename}.`, error)
    }
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

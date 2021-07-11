import { writeFile } from "fs/promises"
import { throwError } from "../../error-handling"
import { isGitInitialized } from "../../helpers/is-git-initialized"
import { Step } from "../step"

const filename = ".gitattributes"

export const addGitAttributesStep: Step = {
  shouldRun: () => true,

  run: async function (this) {
    try {
      if (!(await isGitInitialized())) {
        this.log(
          `Skipping ${filename} setup, as Git is not initialized, because this repository is nested inside another repository.`
        )
        return
      }

      this.log(`Adding ${filename}...`)

      await writeFile(filename, generateGitAttributes())
    } catch (error) {
      throwError.call(
        this,
        `An error occurred while adding ${filename}.`,
        error
      )
    }
  },
}

const generateGitAttributes = (): string => {
  return `
# Normalize end of line. Read more about why in the links below:
# https://prettier.io/docs/en/options.html#end-of-line
# https://git-scm.com/docs/gitattributes#_effects
* text=auto eol=lf
`
}

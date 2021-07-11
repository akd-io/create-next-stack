import { mkdir, writeFile } from "fs/promises"
import { throwError } from "../../../error-handling"
import { Step } from "../../step"
import { generateIndex } from "./generate-index"
import { generatePage } from "./generate-page"
import { generateWithDefaultGlobalStyles } from "./generate-with-global-styles"

export const addContentStep: Step = {
  shouldRun: () => true,

  run: async function (this, answers) {
    this.log("Adding content...")

    try {
      const withDefaultGlobalStylesString = generateWithDefaultGlobalStyles()
      const pageString = generatePage()
      const indexString = generateIndex(answers)

      await mkdir("components")

      await Promise.all([
        writeFile(
          "components/WithDefaultGlobalStyles.tsx",
          withDefaultGlobalStylesString
        ),
        writeFile("components/Page.tsx", pageString),
        writeFile("pages/index.tsx", indexString),
      ])
    } catch (error) {
      throwError.call(this, "An error occurred while adding content.", error)
    }
  },
}

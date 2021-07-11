import { mkdir, writeFile } from "fs/promises"
import { throwError } from "../../../error-handling"
import { techValues } from "../../../questionnaire/questions/technologies"
import { Step } from "../../step"
import { generateApp } from "./generate-app"
import { generateIndex } from "./generate-index/generate-index"
import { indexCSSModule } from "./generate-index/with-css-modules/generate-index-module"
import { generatePage } from "./generate-page"
import { generateWithDefaultGlobalStyles } from "./generate-with-default-global-styles"
import { globalStyles } from "./global-styles"

export const addContentStep: Step = {
  shouldRun: () => true,

  run: async function (this, answers) {
    this.log("Adding content...")

    try {
      await mkdir("components")

      const promises = [
        writeFile("components/Page.tsx", generatePage(answers)),
        writeFile("pages/index.tsx", generateIndex(answers)),
        writeFile("pages/_app.tsx", generateApp(answers)),
      ]

      if (answers.technologies.includes(techValues.emotion)) {
        promises.push(
          writeFile(
            "components/WithDefaultGlobalStyles.tsx",
            generateWithDefaultGlobalStyles()
          )
        )
      }

      if (answers.technologies.includes(techValues.cssModules)) {
        await mkdir("styles")
        promises.push(writeFile("styles/index.module.css", indexCSSModule))
        promises.push(writeFile("styles/global-styles.css", globalStyles))
      }

      await Promise.all(promises)
    } catch (error) {
      throwError.call(this, "An error occurred while adding content.", error)
    }
  },
}

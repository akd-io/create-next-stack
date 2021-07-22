import { promises as fs } from "fs"
import { throwError } from "../../../error-handling"
import { commandInstance } from "../../../instance"
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

  run: async (answers) => {
    const instance = commandInstance.get()
    instance.log("Adding content...")

    try {
      await fs.mkdir("components")

      const promises = [
        fs.writeFile("components/Page.tsx", generatePage(answers)),
        fs.writeFile("pages/index.tsx", generateIndex(answers)),
        fs.writeFile("pages/_app.tsx", generateApp(answers)),
      ]

      if (
        answers.technologies.includes(techValues.emotion) ||
        answers.technologies.includes(techValues.styledComponents)
      ) {
        promises.push(
          fs.writeFile(
            "components/WithDefaultGlobalStyles.tsx",
            generateWithDefaultGlobalStyles(answers)
          )
        )
      } else if (answers.technologies.includes(techValues.cssModules)) {
        await fs.mkdir("styles")
        promises.push(fs.writeFile("styles/index.module.css", indexCSSModule))
        promises.push(fs.writeFile("styles/global-styles.css", globalStyles))
      } else {
        throw new Error(
          "Unsupported styling technology found in addContentStep, or no styling technology was chosen."
        )
      }

      await Promise.all(promises)
    } catch (error) {
      throwError("An error occurred while adding content.", error)
    }
  },
}

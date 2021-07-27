import { promises as fs } from "fs"
import { exitWithError } from "../../../helpers/exit-with-error"
import { commandInstance } from "../../../instance"
import { Step } from "../../step"
import { generatePage } from "./components/generate-page"
import { generateWithDefaultGlobalStyles } from "./components/generate-with-default-global-styles"
import { generateApp } from "./generate-app"
import { globalStyles } from "./global-styles"
import { generateIndexPage } from "./index-page/generate-index"
import { indexCSSModule } from "./index-page/index-css-module"

export const addContentStep: Step = {
  shouldRun: async () => true,

  run: async (inputs) => {
    const instance = commandInstance.get()
    instance.log("Adding content...")

    try {
      await fs.mkdir("components")

      const promises = [
        fs.writeFile("components/Page.tsx", generatePage(inputs)),
        fs.writeFile("pages/index.tsx", generateIndexPage(inputs)),
        fs.writeFile("pages/_app.tsx", generateApp(inputs)),
      ]

      if (
        inputs.flags.styling === "emotion" ||
        inputs.flags.styling === "styled-components"
      ) {
        promises.push(
          fs.writeFile(
            "components/WithDefaultGlobalStyles.tsx",
            generateWithDefaultGlobalStyles(inputs)
          )
        )
      } else if (inputs.flags.styling === "css-modules") {
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
      exitWithError("An error occurred while adding content.", error)
    }
  },
}

import { promises as fs } from "fs"
import { Step } from "../../step"
import { generatePage } from "./components/generate-page"
import { generateWithDefaultGlobalStyles } from "./components/generate-with-default-global-styles"
import { generateApp } from "./generate-app"
import { globalStyles } from "./global-styles"
import { generateIndexPage } from "./index-page/generate-index"

export const addContentStep: Step = {
  description: "adding content",

  shouldRun: async () => true,

  didRun: false,

  run: async (inputs) => {
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
    }

    if (
      inputs.flags.styling === "css-modules" ||
      inputs.flags.styling === "css-modules-with-sass"
    ) {
      await fs.mkdir("styles")
      promises.push(fs.writeFile("styles/global-styles.css", globalStyles))
    }

    await Promise.all(promises)
  },
}

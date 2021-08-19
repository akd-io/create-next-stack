import { promises as fs } from "fs"
import { Step } from "../../step"
import { generatePage } from "./components/generate-page"
import { generateWithDefaultGlobalStyles } from "./components/generate-with-default-global-styles"
import { generateApp } from "./generate-app"
import { generateDocument } from "./generate-document"
import { generateTheme } from "./generate-theme"
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
      fs.writeFile("pages/_document.tsx", generateDocument(inputs)),
    ]

    const { styling } = inputs.flags

    if (styling === "emotion" || styling === "styled-components") {
      promises.push(
        fs.writeFile(
          "components/WithDefaultGlobalStyles.tsx",
          generateWithDefaultGlobalStyles(inputs)
        )
      )
    }

    if (styling === "css-modules" || styling === "css-modules-with-sass") {
      await fs.mkdir("styles")
      const extension = styling === "css-modules" ? "css" : "scss"
      promises.push(
        fs.writeFile(`styles/global-styles.${extension}`, globalStyles)
      )
    }

    if (
      (styling === "emotion" && inputs.flags.chakra) ||
      inputs.flags["material-ui"]
    ) {
      promises.push(fs.writeFile("theme.ts", generateTheme(inputs)))
    }

    await Promise.all(promises)
  },
}

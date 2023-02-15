import { promises as fs } from "fs"
import { writeFile } from "../../../helpers/io"
import { Step } from "../../step"
import { generatePage } from "./components/generate-page"
import { generateWithDefaultGlobalStyles } from "./components/generate-with-default-global-styles"
import { generateTheme } from "./generate-theme"
import { generateApp } from "./pages/generate-app"
import { generateDocument } from "./pages/generate-document"
import { generateIndexPage } from "./pages/generate-index"
import { globalStyles } from "./styles/global-styles"

export const addContentStep: Step = {
  description: "adding content",

  shouldRun: async () => true,

  didRun: false,

  run: async (inputs) => {
    await fs.mkdir("components")

    const promises = [
      writeFile("components/Page.tsx", generatePage(inputs)),
      writeFile("pages/index.tsx", generateIndexPage(inputs)),
      writeFile("pages/_app.tsx", generateApp(inputs)),
      writeFile("pages/_document.tsx", generateDocument(inputs)),
    ]

    const { styling } = inputs.flags

    if (styling === "emotion" || styling === "styled-components") {
      promises.push(
        writeFile(
          "components/WithDefaultGlobalStyles.tsx",
          generateWithDefaultGlobalStyles(inputs)
        )
      )
    }

    if (styling === "css-modules" || styling === "css-modules-with-sass") {
      await fs.mkdir("styles")
      const extension = styling === "css-modules" ? "css" : "scss"
      promises.push(
        writeFile(`styles/global-styles.${extension}`, globalStyles)
      )
    }

    if (
      (styling === "emotion" && inputs.flags.chakra) ||
      inputs.flags["material-ui"]
    ) {
      promises.push(...generateTheme(inputs))
    }

    await Promise.all(promises)
  },
}

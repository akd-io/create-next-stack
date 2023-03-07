import { promises as fs } from "fs"
import { writeFile } from "../../../helpers/io"
import { Step } from "../../step"
import { chakraTheme } from "./chakra-theme"
import { generatePage } from "./components/generate-page"
import { generateWithDefaultGlobalStyles } from "./components/generate-with-default-global-styles"
import { generateApp } from "./generate-app"
import { generateDocument } from "./generate-document"
import { globalStyles } from "./global-styles"
import { generateIndexPage } from "./index-page/generate-index"
import { materialTheme } from "./material-theme"

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

    if (inputs.flags.chakra) {
      promises.push(writeFile("chakra-theme.ts", chakraTheme))
    }

    if (inputs.flags["material-ui"]) {
      promises.push(writeFile("material-theme.ts", materialTheme))
    }

    await Promise.all(promises)
  },
}

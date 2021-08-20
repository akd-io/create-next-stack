import endent from "endent"
import type {
  ValidCNSInputs,
  ValidCreateNextStackFlags,
} from "../../../create-next-stack-types"

const getImports = (flags: ValidCreateNextStackFlags) => {
  if (flags.chakra) {
    return endent/* tsx */ `import { ColorModeScript } from "@chakra-ui/react";`
  } else {
    return ""
  }
}

const getThemeImport = (flags: ValidCreateNextStackFlags) => {
  if (flags["material-ui"] || flags.chakra) {
    return endent/* tsx */ `import { theme } from "../theme";`
  } else {
    return ""
  }
}

const getHeadElements = (flags: ValidCreateNextStackFlags) => {
  if (flags["material-ui"]) {
    return endent/* tsx */ `<meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />`
  } else {
    return ""
  }
}

export const generateDocument = ({ flags }: ValidCNSInputs): string => {
  return endent/* tsx */ `
    ${getImports(flags)}
    import NextDocument, { Html, Head, Main, NextScript } from "next/document";
    ${getThemeImport(flags)}

    export default class Document extends NextDocument {
      render() {
        return (
          <Html lang="en">
            <Head>
              ${getHeadElements(flags)}
            </Head>
            <body>
              ${
                flags.chakra
                  ? /* tsx */ `<ColorModeScript initialColorMode={theme.config.initialColorMode} />`
                  : ""
              }
              <Main />
              <NextScript />
            </body>
          </Html>
        );
      }
    }
  `
}

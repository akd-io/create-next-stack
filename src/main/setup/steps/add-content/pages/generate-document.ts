import endent from "endent"
import type {
  ValidCNSInputs,
  ValidCreateNextStackFlags,
} from "../../../../create-next-stack-types"

const getChakraImports = (flags: ValidCreateNextStackFlags) => {
  if (flags.chakra) {
    return endent/* tsx */ `
      import { ColorModeScript } from "@chakra-ui/react";
      import { chakraTheme } from "../chakra-theme";
    `
  } else {
    return ""
  }
}

const getMaterialImports = (flags: ValidCreateNextStackFlags) => {
  if (flags["material-ui"]) {
    return endent/* tsx */ `
      import { materialTheme } from "../material-theme";
    `
  } else {
    return ""
  }
}

const getHeadElements = (flags: ValidCreateNextStackFlags) => {
  if (flags["material-ui"]) {
    return endent/* tsx */ `
      <meta name="theme-color" content={materialTheme.palette.primary.main} />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    `
  } else {
    return ""
  }
}

export const generateDocument = ({ flags }: ValidCNSInputs): string => {
  return endent/* tsx */ `
    ${getChakraImports(flags)}
    ${getMaterialImports(flags)}
    import NextDocument, { Html, Head, Main, NextScript } from "next/document";

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
                  ? /* tsx */ `<ColorModeScript initialColorMode={chakraTheme.config.initialColorMode} />`
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

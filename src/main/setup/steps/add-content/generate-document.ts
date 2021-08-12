import endent from "endent"
import { ValidCNSInputs } from "../../../create-next-stack-types"

export const generateDocument = ({ flags }: ValidCNSInputs): string => {
  return endent/* tsx */ `
    ${
      flags.chakra
        ? /* tsx */ `import { ColorModeScript } from "@chakra-ui/react";`
        : ""
    }
    import NextDocument, { Html, Head, Main, NextScript } from "next/document";
    ${flags.chakra ? /* tsx */ `import { theme } from "../theme";` : ""}

    export default class Document extends NextDocument {
      render() {
        return (
          <Html lang="en">
            <Head />
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

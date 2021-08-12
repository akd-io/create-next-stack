import endent from "endent"
import { ValidCNSInputs } from "../../../create-next-stack-types"

export const generateDocument = ({ flags }: ValidCNSInputs): string => {
  return endent/* tsx */ `
    import { ColorModeScript } from "@chakra-ui/react";
    import NextDocument, { Html, Head, Main, NextScript } from "next/document";
    import { theme } from "../theme";

    export default class Document extends NextDocument {
      render() {
        return (
          <Html lang="en">
            <Head />
            <body>
              ${
                flags.chakra
                  ? `<ColorModeScript initialColorMode={theme.config.initialColorMode} />`
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

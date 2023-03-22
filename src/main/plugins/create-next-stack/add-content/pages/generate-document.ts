import endent from "endent"
import type { ValidCNSInputs } from "../../../../create-next-stack-types"
import { filterPlugins } from "../../../../setup/setup"

export const generateDocument = (inputs: ValidCNSInputs): string => {
  const documentImports = filterPlugins(inputs).flatMap(
    (plugin) => plugin.slots?.document?.imports ?? []
  )
  const htmlAttributes = filterPlugins(inputs).flatMap(
    (plugin) => plugin.slots?.document?.htmlAttributes ?? []
  )
  const headTags = filterPlugins(inputs).flatMap(
    (plugin) => plugin.slots?.document?.headTags ?? []
  )
  const bodyComponents = filterPlugins(inputs).flatMap(
    (plugin) => plugin.slots?.document?.bodyComponents ?? []
  )

  return endent/* tsx */ `
    import NextDocument, { Html, Head, Main, NextScript } from "next/document";
    ${documentImports.join("\n")}

    export default class Document extends NextDocument {
      render() {
        return (
          <Html lang="en" ${htmlAttributes.join(" ")}>
            <Head>
              ${headTags.join("\n")}
            </Head>
            <body>
              ${bodyComponents.join("\n")}
              <Main />
              <NextScript />
            </body>
          </Html>
        );
      }
    }
  `
}

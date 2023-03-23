import endent from "endent"
import type { ValidCNSInputs } from "../../../../create-next-stack-types"
import { nonNull } from "../../../../helpers/non-null"
import { filterPlugins } from "../../../../setup/setup"

export const generateDocument = (inputs: ValidCNSInputs): string => {
  const documentImports = filterPlugins(inputs)
    .map((plugin) => plugin.slots?.document?.imports)
    .filter(nonNull)
  const htmlAttributes = filterPlugins(inputs)
    .map((plugin) => plugin.slots?.document?.htmlAttributes)
    .filter(nonNull)
  const headTags = filterPlugins(inputs)
    .map((plugin) => plugin.slots?.document?.headTags)
    .filter(nonNull)
  const bodyComponents = filterPlugins(inputs)
    .map((plugin) => plugin.slots?.document?.body)
    .filter(nonNull)

  return endent`
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

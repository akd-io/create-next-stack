import endent from "endent"
import type { ValidCNSInputs } from "../../../../create-next-stack-types"
import { nonNull } from "../../../../helpers/non-null"
import { filterPlugins } from "../../../../setup/setup"

export const generateDocument = async (
  inputs: ValidCNSInputs
): Promise<string> => {
  const imports = (await filterPlugins(inputs))
    .map((plugin) => plugin.slots?.document?.imports)
    .filter(nonNull)
    .join("\n")
  const afterImports = (await filterPlugins(inputs))
    .map((plugin) => plugin.slots?.document?.afterImports)
    .filter(nonNull)
    .join("\n")
  const classMembers = (await filterPlugins(inputs))
    .map((plugin) => plugin.slots?.document?.classMembers)
    .filter(nonNull)
    .join("\n")
  const renderLogic = (await filterPlugins(inputs))
    .map((plugin) => plugin.slots?.document?.renderLogic)
    .filter(nonNull)
    .join("\n")
  const htmlAttributes = (await filterPlugins(inputs))
    .map((plugin) => plugin.slots?.document?.htmlAttributes)
    .filter(nonNull)
    .join(" ")
  const headTags = (await filterPlugins(inputs))
    .map((plugin) => plugin.slots?.document?.headTags)
    .filter(nonNull)
    .join("\n")
  const body = (await filterPlugins(inputs))
    .map((plugin) => plugin.slots?.document?.body)
    .filter(nonNull)
    .join("\n")

  return endent`
    import NextDocument, { Html, Head, Main, NextScript } from "next/document";
    ${imports}

    ${afterImports}

    export default class Document extends NextDocument {
      ${classMembers}

      render() {
        ${renderLogic}
        return (
          <Html lang="en" ${htmlAttributes}>
            <Head>
              ${headTags}
            </Head>
            <body>
              ${body}
              <Main />
              <NextScript />
            </body>
          </Html>
        );
      }
    }
  `
}

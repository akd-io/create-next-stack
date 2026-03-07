import aldent from "aldent"
import type { ValidCNSInputs } from "../../../../create-next-stack-types.ts"
import { nonNull } from "../../../../helpers/non-null.ts"
import { filterPlugins } from "../../../../setup/setup.ts"

export const generateDocument = async (
  inputs: ValidCNSInputs,
): Promise<string> => {
  const imports = (await filterPlugins(inputs))
    .map((plugin) => plugin.slots?.pagesDocument?.imports)
    .filter(nonNull)
    .join("\n")
  const afterImports = (await filterPlugins(inputs))
    .map((plugin) => plugin.slots?.pagesDocument?.afterImports)
    .filter(nonNull)
    .join("\n")
  const classMembers = (await filterPlugins(inputs))
    .map((plugin) => plugin.slots?.pagesDocument?.classMembers)
    .filter(nonNull)
    .join("\n")
  const renderLogic = (await filterPlugins(inputs))
    .map((plugin) => plugin.slots?.pagesDocument?.renderLogic)
    .filter(nonNull)
    .join("\n")
  const htmlAttributes = (await filterPlugins(inputs))
    .map((plugin) => plugin.slots?.pagesDocument?.htmlAttributes)
    .filter(nonNull)
    .join(" ")
  const headTags = (await filterPlugins(inputs))
    .map((plugin) => plugin.slots?.pagesDocument?.headTags)
    .filter(nonNull)
    .join("\n")
  const body = (await filterPlugins(inputs))
    .map((plugin) => plugin.slots?.pagesDocument?.body)
    .filter(nonNull)
    .join("\n")

  return aldent`
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

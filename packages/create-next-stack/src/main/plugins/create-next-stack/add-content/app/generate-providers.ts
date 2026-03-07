import endent from "endent"
import { ValidCNSInputs } from "../../../../create-next-stack-types"
import { nonNull } from "../../../../helpers/non-null"
import { filterPlugins } from "../../../../setup/setup"

export const hasProviderSlots = async (
  inputs: ValidCNSInputs,
): Promise<boolean> => {
  const filteredPlugins = await filterPlugins(inputs)
  return filteredPlugins.some(
    (plugin) =>
      plugin.slots?.appLayout?.providerImports ||
      plugin.slots?.appLayout?.providersStart ||
      plugin.slots?.appLayout?.providersEnd,
  )
}

export const generateProviders = async (
  inputs: ValidCNSInputs,
): Promise<string> => {
  const filteredPlugins = await filterPlugins(inputs)

  const providerImports = filteredPlugins
    .map((plugin) => plugin.slots?.appLayout?.providerImports)
    .filter(nonNull)
    .join("\n")

  const providerAfterImports = filteredPlugins
    .map((plugin) => plugin.slots?.appLayout?.providerAfterImports)
    .filter(nonNull)
    .join("\n")

  const providerLogic = filteredPlugins
    .map((plugin) => plugin.slots?.appLayout?.providerLogic)
    .filter(nonNull)
    .join("\n\n")

  const providersStart = filteredPlugins
    .map((plugin) => plugin.slots?.appLayout?.providersStart)
    .filter(nonNull)
    .join("\n")

  const providersEnd = filteredPlugins
    .map((plugin) => plugin.slots?.appLayout?.providersEnd)
    .filter(nonNull)
    .reverse()
    .join("\n")

  return endent`
    "use client";
    ${providerImports}

    ${providerAfterImports}

    export function Providers({ children }: { children: React.ReactNode }) {
      ${providerLogic}
      return (
        <>
          ${providersStart}
            {children}
          ${providersEnd}
        </>
      );
    }
  `
}

import aldent from "aldent"
import type { ValidCNSInputs } from "../../../../create-next-stack-types.ts"
import { nonNull } from "../../../../helpers/non-null.ts"
import { filterPlugins } from "../../../../setup/setup.ts"

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

  const providerImports = [
    ...new Set(
      filteredPlugins
        .map((plugin) => plugin.slots?.appLayout?.providerImports)
        .filter(nonNull)
        .flatMap((s) => s.split("\n")),
    ),
  ].join("\n")

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

  return aldent`
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

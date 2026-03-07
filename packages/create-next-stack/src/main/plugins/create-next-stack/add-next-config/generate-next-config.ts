import endent from "endent"
import { merge } from "lodash"
import { NextConfig } from "next"
import { ValidCNSInputs } from "../../../create-next-stack-types"
import { nonNull } from "../../../helpers/non-null"
import { stringify } from "../../../helpers/stringify"
import { filterPlugins } from "../../../setup/setup"

export const generateNextConfig = async (
  inputs: ValidCNSInputs,
): Promise<string> => {
  const defaultNextConfig: NextConfig = {
    reactStrictMode: true,
  }
  const nextConfigs = (await filterPlugins(inputs))
    .map((plugin) => plugin.slots?.nextConfig?.nextConfig)
    .filter(nonNull)
  const mergedNextConfig = merge(defaultNextConfig, ...nextConfigs)

  const imports = (await filterPlugins(inputs))
    .map((plugin) => plugin.slots?.nextConfig?.imports)
    .filter(nonNull)
    .join("\n")

  const wrappersStart = (await filterPlugins(inputs))
    .map((plugin) => plugin.slots?.nextConfig?.wrappersStart)
    .filter(nonNull)

  const wrappersEnd = (await filterPlugins(inputs))
    .map((plugin) => plugin.slots?.nextConfig?.wrappersEnd)
    .filter(nonNull)
    .reverse()

  return endent`
    import type { NextConfig } from "next";
    ${imports}

    const nextConfig: NextConfig = ${stringify(mergedNextConfig)};

    export default ${wrappersStart}nextConfig${wrappersEnd};
  `
}

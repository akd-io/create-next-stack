import aldent from "aldent"
import lodash from "lodash"
const { merge } = lodash
import { NextConfig } from "next"
import { ValidCNSInputs } from "../../../create-next-stack-types.ts"
import { nonNull } from "../../../helpers/non-null.ts"
import { stringify } from "../../../helpers/stringify.ts"
import { filterPlugins } from "../../../setup/setup.ts"

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

  return aldent`
    import type { NextConfig } from "next";
    ${imports}

    const nextConfig: NextConfig = ${stringify(mergedNextConfig)};

    export default ${wrappersStart.join("")}nextConfig${wrappersEnd.join("")};
  `
}

import aldent from "aldent"
import type { ValidCNSInputs } from "../../../create-next-stack-types.ts"
import { nonNull } from "../../../helpers/non-null.ts"
import { filterPlugins } from "../../../setup/setup.ts"

export const hasPostcssConfig = async (
  inputs: ValidCNSInputs,
): Promise<boolean> => {
  const filteredPlugins = await filterPlugins(inputs)
  return filteredPlugins.some((plugin) => plugin.slots?.postcssConfig?.plugins)
}

export const generatePostcssConfig = async (
  inputs: ValidCNSInputs,
): Promise<string> => {
  const pluginEntries = (await filterPlugins(inputs))
    .map((plugin) => plugin.slots?.postcssConfig?.plugins)
    .filter(nonNull)

  const mergedPlugins = Object.assign({}, ...pluginEntries)

  const pluginsString = Object.entries(mergedPlugins)
    .map(([name, options]) => `    "${name}": ${options}`)
    .join(",\n")

  return aldent`
    const config = {
      plugins: {
    ${pluginsString}
      },
    };

    export default config;
  `
}

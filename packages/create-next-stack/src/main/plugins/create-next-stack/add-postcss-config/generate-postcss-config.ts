import endent from "endent"
import { ValidCNSInputs } from "../../../create-next-stack-types"
import { nonNull } from "../../../helpers/non-null"
import { filterPlugins } from "../../../setup/setup"

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

  return endent`
    const config = {
      plugins: {
    ${pluginsString}
      },
    };

    export default config;
  `
}

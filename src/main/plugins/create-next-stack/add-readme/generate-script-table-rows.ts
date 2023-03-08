import { ValidCNSInputs } from "../../../create-next-stack-types"
import { filterPlugins } from "../../../setup/setup"

export const generateScriptTableRows = async (
  inputs: ValidCNSInputs
): Promise<string> => {
  const pluginScripts = filterPlugins(inputs)
    .map((plugin) => plugin.scripts ?? [])
    .flat()

  const scriptRowsString = pluginScripts
    .map((script) => `|\`${script.name}\`|${script.description}|`)
    .join("\n")

  return scriptRowsString
}

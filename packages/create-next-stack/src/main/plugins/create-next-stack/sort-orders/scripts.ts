import { ValidCNSInputs } from "../../../create-next-stack-types"
import { compareByOrder } from "../../../helpers/sort-by-order"
import { filterPlugins } from "../../../setup/setup"

export const scriptsSortOrder: string[] = [
  "prepare",
  "test",
  "dev",
  "build",
  "start",
  "lint",
  "format",
  "format:check",
]

export const getSortedFilteredScripts = (inputs: ValidCNSInputs) => {
  const pluginScripts = filterPlugins(inputs).flatMap(
    (plugin) => plugin.scripts ?? []
  )
  return pluginScripts.sort((a, b) =>
    compareByOrder(a.name, b.name, scriptsSortOrder)
  )
}

import { ValidCNSInputs } from "../../../create-next-stack-types"
import { nonNull } from "../../../helpers/non-null"
import { compareByOrder } from "../../../helpers/sort-by-order"
import { filterPlugins } from "../../../setup/setup"

export const environmentVariablesSortOrder: string[] = [
  "NEXT_PUBLIC_WEBSITE_DOMAIN",
]

export const getEnvironmentVariables = async (inputs: ValidCNSInputs) => {
  const pluginEnvironmentVariables = (await filterPlugins(inputs))
    .flatMap((plugin) => plugin.environmentVariables)
    .filter(nonNull)
  return pluginEnvironmentVariables.sort((a, b) =>
    compareByOrder(a.name, b.name, environmentVariablesSortOrder)
  )
}

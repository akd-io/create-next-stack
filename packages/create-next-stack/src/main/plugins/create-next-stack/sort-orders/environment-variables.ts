import type { ValidCNSInputs } from "../../../create-next-stack-types.ts"
import { nonNull } from "../../../helpers/non-null.ts"
import { compareByOrder } from "../../../helpers/sort-by-order.ts"
import { filterPlugins } from "../../../setup/setup.ts"

export const environmentVariablesSortOrder: string[] = [
  "AUTH_SECRET",
  "NEXT_PUBLIC_WEBSITE_DOMAIN",
]

export const getEnvironmentVariables = async (inputs: ValidCNSInputs) => {
  const pluginEnvironmentVariables = (await filterPlugins(inputs))
    .flatMap((plugin) => plugin.environmentVariables)
    .filter(nonNull)
  return pluginEnvironmentVariables.sort((a, b) =>
    compareByOrder(a.name, b.name, environmentVariablesSortOrder),
  )
}

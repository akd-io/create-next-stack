import type { ValidCNSInputs } from "../../../create-next-stack-types.ts"
import { nonNull } from "../../../helpers/non-null.ts"
import { compareByOrder } from "../../../helpers/sort-by-order.ts"
import { filterPlugins } from "../../../setup/setup.ts"

export const scriptsSortOrder: string[] = [
  "prepare",
  "test",
  "test:watch",
  "test:ci",
  "dev",
  "build",
  "start",
  "lint",
  "format",
  "format:check",
  "deploy:vercel",
  "deploy:netlify",
]

export const getScripts = async (inputs: ValidCNSInputs) => {
  const pluginScripts = (await filterPlugins(inputs))
    .flatMap((plugin) => plugin.scripts)
    .filter(nonNull)
  return pluginScripts.sort((a, b) =>
    compareByOrder(a.name, b.name, scriptsSortOrder),
  )
}

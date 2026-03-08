import type { ValidCNSInputs } from "./create-next-stack-types.ts"
import { nonNull } from "./helpers/non-null.ts"
import { compareByOrder } from "./helpers/sort-by-order.ts"
import type { Step } from "./plugin.ts"
import { filterPlugins } from "./setup/setup.ts"

export const stepsOrder: string[] = [
  // Update package manager
  "updatePnpm",
  "updateYarn",
  // Create Next App
  "createNextApp",
  "removeOfficialCNAContent",
  // Install dependencies
  "installDependencies",
  // Configuration
  "addScripts",
  "addGitAttributes",
  // Styling
  "setUpEmotion",
  // Formatting
  "setUpPrettier",
  "setUpFormattingPreCommitHook",
  // Add/generate content
  "copyAssets",
  "addContent",
  // ORMs
  "setUpPrisma",
  // Format & initial commit
  "formatProject",
  // Uninstall temporary dependencies
  "uninstallTemporaryDependencies",
  "initialCommit",
]

export const getSteps = async (inputs: ValidCNSInputs): Promise<Step[]> => {
  return (await filterPlugins(inputs))
    .flatMap((plugin) => plugin.steps)
    .filter(nonNull)
    .sort((a, b) => compareByOrder(a.id, b.id, stepsOrder))
}

import { ValidCNSInputs } from "./create-next-stack-types"
import { nonNull } from "./helpers/non-null"
import { compareByOrder } from "./helpers/sort-by-order"
import { Step } from "./plugin"
import { filterPlugins } from "./setup/setup"

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
  // Uninstall temporary dependencies
  "uninstallTemporaryDependencies",
  // ORMs
  "setUpPrisma",
  // Format & initial commit
  "formatProject",
  "initialCommit",
]

export const getSteps = async (inputs: ValidCNSInputs): Promise<Step[]> => {
  return (await filterPlugins(inputs))
    .flatMap((plugin) => plugin.steps)
    .filter(nonNull)
    .sort((a, b) => compareByOrder(a.id, b.id, stepsOrder))
}

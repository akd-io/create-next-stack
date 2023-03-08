import chalk from "chalk"
import { ValidCNSInputs } from "../create-next-stack-types"
import { capitalizeFirstLetter } from "../helpers/capitalize-first-letter"
import { getDiffString } from "../helpers/diff-string"
import { inDebugMode } from "../helpers/in-debug-mode"
import { time } from "../helpers/time"
import { logDebug, logInfo } from "../logging"
import {
  createStep,
  evalShouldRun,
  InitializedStep,
  initializePlugin,
  Step,
} from "../plugin"
import { chakraUIPlugin } from "../plugins/chakra-ui"
import { createNextStackPlugin } from "../plugins/create-next-stack"
import { cssModulesPlugin } from "../plugins/css-modules"
import { emotionPlugin } from "../plugins/emotion"
import { eslintPlugin } from "../plugins/eslint"
import { formikPlugin } from "../plugins/formik"
import { framerMotionPlugin } from "../plugins/framer-motion"
import { gitAttributesPlugin } from "../plugins/git-attributes"
import { githubActionsPlugin } from "../plugins/github-actions"
import { lintStagedPlugin } from "../plugins/lint-staged"
import { materialUIPlugin } from "../plugins/material-ui"
import { nextPlugin } from "../plugins/next"
import { npmPlugin } from "../plugins/npm"
import { prettierPlugin } from "../plugins/prettier"
import { reactPlugin } from "../plugins/react"
import { reactHookFormPlugin } from "../plugins/react-hook-form"
import { sassPlugin } from "../plugins/sass"
import { styledComponentsPlugin } from "../plugins/styled-components"
import { tailwindCSSPlugin } from "../plugins/tailwind-css"
import { typescriptPlugin } from "../plugins/typescript"
import { yarnPlugin } from "../plugins/yarn"
import { printFinalMessages } from "./print-final-messages"
import { addContentStep } from "./steps/add-content/add-content"
import { addReadmeStep } from "./steps/add-readme/add-readme"
import { copyAssetsStep } from "./steps/copy-assets"
import { gitCommitStep } from "./steps/git-commit"
import { installDependenciesStep } from "./steps/install-dependencies"
import { uninstallTemporaryDependenciesStep } from "./steps/uninstall-temporary-dependencies"

// Ordered by relevance to the user for use in technology lists // TODO: Fix this by having separate ordered lists of plugins where other sortings are needed.
const rawPlugins = [
  createNextStackPlugin,
  nextPlugin,
  reactPlugin,
  typescriptPlugin,
  emotionPlugin,
  styledComponentsPlugin,
  tailwindCSSPlugin,
  cssModulesPlugin,
  sassPlugin,
  chakraUIPlugin,
  materialUIPlugin,
  reactHookFormPlugin,
  formikPlugin,
  framerMotionPlugin,
  eslintPlugin,
  prettierPlugin,
  lintStagedPlugin,
  yarnPlugin,
  npmPlugin,
  githubActionsPlugin,
  gitAttributesPlugin,
]
export const plugins = rawPlugins.map((plugin) => initializePlugin(plugin))

export const filterPlugins = (inputs: ValidCNSInputs): typeof plugins =>
  plugins.filter((plugin) => {
    // TODO: Fix this hack. We shouldn't rely on the first step of a plugin to determine whether to include the plugin or not.
    const firstStep = plugin.steps?.[0]
    return firstStep == null ? true : evalShouldRun(firstStep.shouldRun, inputs)
  })

export const performSetupSteps = async (
  inputs: ValidCNSInputs
): Promise<void> => {
  const steps: Step[] = [
    // Create Next App
    nextPlugin.steps.createNextApp,

    // Package management
    yarnPlugin.steps.updateYarn,
    installDependenciesStep,

    // Remove official CNA content
    nextPlugin.steps.removeOfficialCNAContent,

    // Configuration
    createNextStackPlugin.steps.addScripts,
    gitAttributesPlugin.steps.addGitAttributes,
    nextPlugin.steps.addNextConfig,

    // Styling
    tailwindCSSPlugin.steps.setup,

    // Formatting
    lintStagedPlugin.steps.setup,

    // Continuous integration
    githubActionsPlugin.steps.addGithubWorkflowStep,

    // Add/generate content
    copyAssetsStep,
    addContentStep,
    addReadmeStep,

    // Uninstall temporary dependencies
    uninstallTemporaryDependenciesStep,

    // Format & initial commit
    prettierPlugin.steps.formatProject,
    gitCommitStep,
  ]

  const enhancedSteps: InitializedStep[] = steps.map((step) => createStep(step))

  const allStepsDiff = await time(async () => {
    for (const step of enhancedSteps) {
      const shouldRun =
        typeof step.shouldRun === "function"
          ? await step.shouldRun(inputs)
          : step.shouldRun

      if (!shouldRun) continue

      logInfo(`${capitalizeFirstLetter(step.description)}...`)

      const diff = await time(async () => {
        await step.run(inputs)
      })

      if (inDebugMode() && diff > 1000) {
        logDebug(
          chalk.yellow(`Step took ${getDiffString(diff)} (${step.description})`)
        )
      }
    }
  })

  if (inDebugMode() && allStepsDiff > 1000) {
    logDebug(chalk.yellow(`All steps took ${getDiffString(allStepsDiff)}`))
  }

  printFinalMessages(inputs)
}

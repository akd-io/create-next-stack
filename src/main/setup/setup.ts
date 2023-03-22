import chalk from "chalk"
import { ValidCNSInputs } from "../create-next-stack-types"
import { capitalizeFirstLetter } from "../helpers/capitalize-first-letter"
import { getDiffString } from "../helpers/diff-string"
import { inDebugMode } from "../helpers/in-debug-mode"
import { time } from "../helpers/time"
import { logDebug, logInfo } from "../logging"
import { evalActive, evalShouldRun, Plugin } from "../plugin"
import { chakraUIPlugin } from "../plugins/chakra-ui/chakra-ui"
import { createNextStackPlugin } from "../plugins/create-next-stack/create-next-stack"
import { cssModulesPlugin } from "../plugins/css-modules/css-modules"
import { emotionPlugin } from "../plugins/emotion"
import { eslintPlugin } from "../plugins/eslint"
import { formattingPreCommitHookPlugin } from "../plugins/formatting-pre-commit-hook"
import { formikPlugin } from "../plugins/formik"
import { framerMotionPlugin } from "../plugins/framer-motion"
import { githubActionsPlugin } from "../plugins/github-actions"
import { materialUIPlugin } from "../plugins/material-ui/material-ui"
import { nextPlugin } from "../plugins/next"
import { npmPlugin } from "../plugins/npm"
import { prettierPlugin } from "../plugins/prettier"
import { reactPlugin } from "../plugins/react"
import { reactHookFormPlugin } from "../plugins/react-hook-form"
import { sassPlugin } from "../plugins/sass/sass"
import { styledComponentsPlugin } from "../plugins/styled-components"
import { tailwindCSSPlugin } from "../plugins/tailwind-css"
import { typescriptPlugin } from "../plugins/typescript"
import { yarnPlugin } from "../plugins/yarn"
import { printFinalMessages } from "./print-final-messages"

// Ordered by relevance to the user for use in technology lists // TODO: Fix this by having separate ordered lists of plugins where other sortings are needed.
export const plugins: Plugin[] = [
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
  formattingPreCommitHookPlugin,
  yarnPlugin,
  npmPlugin,
  githubActionsPlugin,
]

export const filterPlugins = (inputs: ValidCNSInputs): Plugin[] =>
  plugins.filter(async (plugin) => await evalActive(plugin.active, inputs))

export const performSetupSteps = async (
  inputs: ValidCNSInputs
): Promise<void> => {
  const steps = [
    // Create Next App
    nextPlugin.steps.createNextApp,

    // Package management
    yarnPlugin.steps.updateYarn,
    createNextStackPlugin.steps.installDependencies,

    // Remove official CNA content
    nextPlugin.steps.removeOfficialCNAContent,

    // Configuration
    createNextStackPlugin.steps.addScripts,
    createNextStackPlugin.steps.addGitAttributes,
    nextPlugin.steps.addNextConfig,

    // Styling
    tailwindCSSPlugin.steps.setup,
    cssModulesPlugin.steps.setup,
    sassPlugin.steps.setup,
    emotionPlugin.steps.setup,

    // Formatting
    prettierPlugin.steps.setup,
    formattingPreCommitHookPlugin.steps.setup,

    // Continuous integration
    githubActionsPlugin.steps.addGithubWorkflowStep,

    // Add/generate content
    createNextStackPlugin.steps.copyAssets,
    createNextStackPlugin.steps.addContent,
    createNextStackPlugin.steps.addReadme,

    // Component libraries
    chakraUIPlugin.steps.setup,
    materialUIPlugin.steps.setup,

    // Uninstall temporary dependencies
    createNextStackPlugin.steps.uninstallTemporaryDependencies,

    // Format & initial commit
    createNextStackPlugin.steps.formatProject,
    createNextStackPlugin.steps.initialCommit,
  ] as const

  const allStepsDiff = await time(async () => {
    for (const step of steps) {
      const pluginActive = await evalActive(step.plugin.active, inputs)
      const stepShouldRun = await evalShouldRun(step.shouldRun, inputs)
      if (!pluginActive || !stepShouldRun) {
        continue
      }

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

import chalk from "chalk"
import { ValidCNSInputs } from "../create-next-stack-types"
import { capitalizeFirstLetter } from "../helpers/capitalize-first-letter"
import { getDiffString } from "../helpers/diff-string"
import { inDebugMode } from "../helpers/in-debug-mode"
import { time } from "../helpers/time"
import { logDebug, logInfo } from "../logging"
import { Plugin, evalActive, evalShouldRun } from "../plugin"
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
import { pnpmPlugin } from "../plugins/pnpm"
import { prettierPlugin } from "../plugins/prettier"
import { reactPlugin } from "../plugins/react"
import { reactHookFormPlugin } from "../plugins/react-hook-form"
import { reactIconsPlugin } from "../plugins/react-icons"
import { sassPlugin } from "../plugins/sass/sass"
import { styledComponentsPlugin } from "../plugins/styled-components"
import { tailwindCSSPlugin } from "../plugins/tailwind-css"
import { typescriptPlugin } from "../plugins/typescript"
import { yarnPlugin } from "../plugins/yarn"
import { steps } from "../steps"
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
  pnpmPlugin,
  yarnPlugin,
  npmPlugin,
  githubActionsPlugin,
  reactIconsPlugin,
]

export const filterPlugins = (inputs: ValidCNSInputs): Plugin[] =>
  plugins.filter((plugin) => evalActive(plugin.active, inputs))

export const performSetupSteps = async (
  inputs: ValidCNSInputs
): Promise<void> => {
  const allStepsDiff = await time(async () => {
    for (const step of steps) {
      const pluginActive = evalActive(step.plugin.active, inputs)
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

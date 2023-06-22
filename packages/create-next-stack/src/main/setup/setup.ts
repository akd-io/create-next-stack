import chalk from "chalk"
import { ValidCNSInputs } from "../create-next-stack-types"
import { capitalizeFirstLetter } from "../helpers/capitalize-first-letter"
import { getDiffString } from "../helpers/diff-string"
import { inDebugMode } from "../helpers/in-debug-mode"
import { time } from "../helpers/time"
import { logDebug, logInfo } from "../logging"
import { evalOptionalProperty, evalProperty, Plugin } from "../plugin"
import { chakraUIPlugin } from "../plugins/chakra-ui"
import { createNextStackPlugin } from "../plugins/create-next-stack/create-next-stack"
import { cssModulesPlugin } from "../plugins/css-modules"
import { emotionPlugin } from "../plugins/emotion"
import { eslintPlugin } from "../plugins/eslint"
import { formattingPreCommitHookPlugin } from "../plugins/formatting-pre-commit-hook"
import { formikPlugin } from "../plugins/formik"
import { framerMotionPlugin } from "../plugins/framer-motion"
import { githubActionsPlugin } from "../plugins/github-actions"
import { mantinePlugin } from "../plugins/mantine"
import { materialUIPlugin } from "../plugins/material-ui"
import { netlifyPlugin } from "../plugins/netlify"
import { nextPlugin } from "../plugins/next"
import { npmPlugin } from "../plugins/npm"
import { plausiblePlugin } from "../plugins/plausible"
import { pnpmPlugin } from "../plugins/pnpm"
import { prettierPlugin } from "../plugins/prettier"
import { prismaPlugin } from "../plugins/prisma"
import { reactPlugin } from "../plugins/react"
import { reactHookFormPlugin } from "../plugins/react-hook-form"
import { reactIconsPlugin } from "../plugins/react-icons"
import { reactQueryPlugin } from "../plugins/react-query"
import { sassPlugin } from "../plugins/sass"
import { styledComponentsPlugin } from "../plugins/styled-components"
import { tailwindCSSPlugin } from "../plugins/tailwind-css"
import { typescriptPlugin } from "../plugins/typescript"
import { vercelPlugin } from "../plugins/vercel"
import { yarnPlugin } from "../plugins/yarn"
import { getSteps } from "../steps"
import { printFinalMessages } from "./print-final-messages"

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
  mantinePlugin,
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
  reactQueryPlugin,
  plausiblePlugin,
  vercelPlugin,
  netlifyPlugin,
  prismaPlugin,
]

export const filterPlugins = (inputs: ValidCNSInputs): Plugin[] =>
  plugins.filter(async (plugin) => await evalProperty(plugin.active, inputs))

export const performSetupSteps = async (
  inputs: ValidCNSInputs
): Promise<void> => {
  const steps = getSteps(inputs)

  const allStepsDiff = await time(async () => {
    for (const step of steps) {
      const stepShouldRun = await evalOptionalProperty(
        step.shouldRun,
        inputs,
        true
      )
      if (!stepShouldRun) {
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

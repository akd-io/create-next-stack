import chalk from "chalk"
import type { ValidCNSInputs } from "../create-next-stack-types.ts"
import { capitalizeFirstLetter } from "../helpers/capitalize-first-letter.ts"
import { getDiffString } from "../helpers/diff-string.ts"
import { filterAsync } from "../helpers/filterAsync.ts"
import { inDebugMode } from "../helpers/in-debug-mode.ts"
import { time } from "../helpers/time.ts"
import { logDebug, logInfo } from "../logging.ts"
import { evalOptionalProperty, evalProperty, type Plugin } from "../plugin.ts"
import { chakraUIPlugin } from "../plugins/chakra-ui.ts"
import { createNextStackPlugin } from "../plugins/create-next-stack/create-next-stack.ts"
import { cssModulesPlugin } from "../plugins/css-modules.ts"
import { emotionPlugin } from "../plugins/emotion.ts"
import { eslintPlugin } from "../plugins/eslint.ts"
import { formattingPreCommitHookPlugin } from "../plugins/formatting-pre-commit-hook.ts"
import { formikPlugin } from "../plugins/formik.ts"
import { framerMotionPlugin } from "../plugins/framer-motion.ts"
import { githubActionsPlugin } from "../plugins/github-actions.ts"
import { mantinePlugin } from "../plugins/mantine.ts"
import { materialUIPlugin } from "../plugins/material-ui.ts"
import { netlifyPlugin } from "../plugins/netlify.ts"
import { nextPlugin } from "../plugins/next.ts"
import { npmPlugin } from "../plugins/npm.ts"
import { plausiblePlugin } from "../plugins/plausible.ts"
import { pnpmPlugin } from "../plugins/pnpm.ts"
import { prettierPlugin } from "../plugins/prettier.ts"
import { prismaPlugin } from "../plugins/prisma.ts"
import { reactPlugin } from "../plugins/react.ts"
import { reactHookFormPlugin } from "../plugins/react-hook-form.ts"
import { reactIconsPlugin } from "../plugins/react-icons.ts"
import { reactQueryPlugin } from "../plugins/react-query.ts"
import { sassPlugin } from "../plugins/sass.ts"
import { styledComponentsPlugin } from "../plugins/styled-components.ts"
import { supabasePlugin } from "../plugins/supabase.ts"
import { tailwindCSSPlugin } from "../plugins/tailwind-css.ts"
import { typescriptPlugin } from "../plugins/typescript.ts"
import { vercelPlugin } from "../plugins/vercel.ts"
import { yarnPlugin } from "../plugins/yarn.ts"
import { getSteps } from "../steps.ts"
import { printFinalMessages } from "./print-final-messages.ts"

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
  supabasePlugin,
]

export const filterPlugins = async (
  inputs: ValidCNSInputs,
): Promise<Plugin[]> => {
  return await filterAsync(
    plugins,
    async (plugin) => await evalProperty(plugin.active, inputs),
  )
}

export const performSetupSteps = async (
  inputs: ValidCNSInputs,
): Promise<void> => {
  const steps = await getSteps(inputs)

  const allStepsDiff = await time(async () => {
    for (const step of steps) {
      const stepShouldRun = await evalOptionalProperty(
        step.shouldRun,
        inputs,
        true,
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
          chalk.yellow(
            `Step took ${getDiffString(diff)} (${step.description})`,
          ),
        )
      }
    }
  })

  if (inDebugMode() && allStepsDiff > 1000) {
    logDebug(chalk.yellow(`All steps took ${getDiffString(allStepsDiff)}`))
  }

  printFinalMessages(inputs)
}

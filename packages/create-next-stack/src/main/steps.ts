import { Step } from "./plugin"
import { createNextStackPlugin } from "./plugins/create-next-stack/create-next-stack"
import { emotionPlugin } from "./plugins/emotion"
import { formattingPreCommitHookPlugin } from "./plugins/formatting-pre-commit-hook"
import { githubActionsPlugin } from "./plugins/github-actions"
import { nextPlugin } from "./plugins/next"
import { pnpmPlugin } from "./plugins/pnpm"
import { prettierPlugin } from "./plugins/prettier"
import { yarnPlugin } from "./plugins/yarn"

export const steps: Step[] = [
  // Update package manager
  pnpmPlugin.steps.updatePnpm,
  yarnPlugin.steps.updateYarn,

  // Create Next App
  nextPlugin.steps.createNextApp,
  nextPlugin.steps.removeOfficialCNAContent,

  // Install dependencies
  createNextStackPlugin.steps.installDependencies,

  // Configuration
  createNextStackPlugin.steps.addScripts,
  createNextStackPlugin.steps.addGitAttributes,
  nextPlugin.steps.addNextConfig,

  // Styling
  emotionPlugin.steps.setUpEmotion,

  // Formatting
  prettierPlugin.steps.setUpPrettier,
  formattingPreCommitHookPlugin.steps.setUpFormattingPreCommitHook,

  // Continuous integration
  githubActionsPlugin.steps.addGithubWorkflowStep,

  // Add/generate content
  createNextStackPlugin.steps.copyAssets,
  createNextStackPlugin.steps.addContent,
  createNextStackPlugin.steps.addReadme,

  // Uninstall temporary dependencies
  createNextStackPlugin.steps.uninstallTemporaryDependencies,

  // Format & initial commit
  createNextStackPlugin.steps.formatProject,
  createNextStackPlugin.steps.initialCommit,
]

import { ValidCNSInputs } from "../create-next-stack-types"
import { capitalizeFirstLetter } from "../helpers/capitalize-first-letter"
import { logInfo } from "../logging"
import { Step } from "./step"
import { addBaseBabelConfigStep } from "./steps/add-base-babel-config"
import { addContentStep } from "./steps/add-content/add-content"
import { addGitAttributesStep } from "./steps/add-git-attributes"
import { addReadmeStep } from "./steps/add-readme/add-readme"
import { copyAssetsStep } from "./steps/copy-assets"
import { createNextAppStep } from "./steps/create-next-app"
import { formatProjectStep } from "./steps/format-project"
import { gitCommitStep } from "./steps/git-commit"
import { installFormikStep } from "./steps/install-formik"
import { installFramerMotionStep } from "./steps/install-framer-motion"
import { installReactHookFormStep } from "./steps/install-react-hook-form"
import { printFinalMessagesStep } from "./steps/print-final-messages"
import { removeOfficialCNAContentStep } from "./steps/remove-official-cna-content"
import { setUpEmotionStep } from "./steps/set-up-emotion"
import { setUpLintStagedStep } from "./steps/set-up-lint-staged"
import { setUpPrettierStep } from "./steps/set-up-prettier"
import { setUpStyledComponentsStep } from "./steps/set-up-styled-components"
import { updateYarnStep } from "./steps/update-yarn"

export const performSetupSteps = async (
  inputs: ValidCNSInputs
): Promise<void> => {
  const steps: Step[] = [
    // Package management
    updateYarnStep,

    // Create Next App
    createNextAppStep,
    removeOfficialCNAContentStep,

    // Configuration
    addBaseBabelConfigStep,
    addGitAttributesStep,

    // Styling
    setUpEmotionStep,
    setUpStyledComponentsStep,

    // Formatting
    setUpPrettierStep,
    setUpLintStagedStep,

    // Form state management
    installReactHookFormStep,
    installFormikStep,

    // Animation
    installFramerMotionStep,

    // Add/generate content
    copyAssetsStep,
    addContentStep,
    addReadmeStep,

    // Format & initial commit
    formatProjectStep,
    gitCommitStep,

    // Print success message
    printFinalMessagesStep,
  ]

  for (const step of steps) {
    if (await step.shouldRun(inputs)) {
      logInfo(`${capitalizeFirstLetter(step.description)}...`)

      await step.run(inputs)

      step.didRun = true
    }
  }
}

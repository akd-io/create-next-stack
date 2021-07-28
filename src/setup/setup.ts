import { ValidCNSInputs } from "../create-next-stack-types"
import { capitalizeFirstLetter } from "../helpers/capitalize-first-letter"
import { exitWithError } from "../helpers/exit-with-error"
import { commandInstance } from "../instance"
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
import { printGitInitializationWarningStep } from "./steps/print-git-initialization-warning"
import { printSuccessMessageStep } from "./steps/print-success-message"
import { removeOfficialCNAContentStep } from "./steps/remove-official-cna-content"
import { setUpEmotionStep } from "./steps/set-up-emotion"
import { setUpLintStagedStep } from "./steps/set-up-lint-staged"
import { setUpPrettierStep } from "./steps/set-up-prettier"
import { setUpStyledComponentsStep } from "./steps/set-up-styled-components"
import { updateYarnStep } from "./steps/update-yarn"

export const performSetupSteps = async (
  inputs: ValidCNSInputs
): Promise<void> => {
  const instance = commandInstance.get()

  const steps: Step[] = [
    updateYarnStep,
    createNextAppStep,

    removeOfficialCNAContentStep,
    copyAssetsStep,

    addBaseBabelConfigStep,
    setUpEmotionStep,
    setUpStyledComponentsStep,

    setUpPrettierStep,
    setUpLintStagedStep,

    installReactHookFormStep,
    installFormikStep,
    installFramerMotionStep,

    addContentStep,

    addReadmeStep,

    formatProjectStep,
    addGitAttributesStep,
    gitCommitStep,

    printGitInitializationWarningStep,
    printSuccessMessageStep,
  ]

  for (const step of steps) {
    if (await step.shouldRun(inputs)) {
      instance.log(`${capitalizeFirstLetter(step.description)}...`)

      try {
        await step.run(inputs)
      } catch (error) {
        exitWithError(`An error occurred while ${step.description}.`, error)
      }

      step.didRun = true
    }
  }
}

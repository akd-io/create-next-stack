import {
  CreateNextStackArgs,
  CreateNextStackFlags,
} from "../create-next-stack-types"
import { Step } from "./step"
import { addBaseBabelConfigStep } from "./steps/add-base-babel-config"
import { addContentStep } from "./steps/add-content/add-content"
import { addGitAttributesStep } from "./steps/add-git-attributes"
import { addReadmeStep } from "./steps/add-readme/add-readme"
import { createNextAppStep } from "./steps/create-next-app"
import { formatProjectStep } from "./steps/format-project"
import { gitCommitStep } from "./steps/git-commit"
import { installFormikStep } from "./steps/install-formik"
import { installFramerMotionStep } from "./steps/install-framer-motion"
import { installReactHookFormStep } from "./steps/install-react-hook-form"
import { printSuccessMessageStep } from "./steps/print-success-message"
import { removeOfficialCNAContentStep } from "./steps/remove-official-cna-content"
import { setUpEmotionStep } from "./steps/set-up-emotion"
import { setUpLintStagedStep } from "./steps/set-up-lint-staged"
import { setUpPrettierStep } from "./steps/set-up-prettier"
import { setUpStyledComponentsStep } from "./steps/set-up-styled-components"
import { updateYarnStep } from "./steps/update-yarn"

export const performSetupSteps = async (
  args: CreateNextStackArgs,
  flags: CreateNextStackFlags
): Promise<void> => {
  const steps: Step[] = [
    updateYarnStep,
    createNextAppStep,

    removeOfficialCNAContentStep,

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

    printSuccessMessageStep,
  ]

  for (const step of steps) {
    if (step.shouldRun(answers)) {
      await step.run(answers)
    }
  }
}

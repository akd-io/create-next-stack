import Command from "@oclif/command"
import { QuestionnaireAnswers } from "../questionnaire/questionnaire"
import { Step } from "./step"
import { addBaseBabelConfigStep } from "./steps/add-base-babel-config"
import { addContentStep } from "./steps/add-content/add-content"
import { addReadmeStep } from "./steps/add-readme/add-readme"
import { createNextAppStep } from "./steps/create-next-app"
import { formatProjectStep } from "./steps/format-project"
import { gitCommitStep } from "./steps/git-commit"
import { installFormikStep } from "./steps/install-formik"
import { installFramerMotionStep } from "./steps/install-framer-motion"
import { installReactHookFormStep } from "./steps/install-react-hook-form"
import { removeOfficialCNAContentStep } from "./steps/remove-official-cna-content"
import { setUpEmotionStep } from "./steps/set-up-emotion"
import { setUpLintStagedStep } from "./steps/set-up-lint-staged"
import { setUpPrettierStep } from "./steps/set-up-prettier"
import { updateYarnStep } from "./steps/update-yarn"

export async function performSetupSteps(
  this: Command,
  answers: QuestionnaireAnswers
): Promise<void> {
  const steps: Step[] = [
    updateYarnStep,
    createNextAppStep,

    removeOfficialCNAContentStep,

    addBaseBabelConfigStep,
    setUpEmotionStep,

    setUpPrettierStep,
    setUpLintStagedStep,

    installReactHookFormStep,
    installFormikStep,
    installFramerMotionStep,

    addContentStep,

    addReadmeStep,

    formatProjectStep,
    gitCommitStep,
  ]

  for (const step of steps) {
    if (step.shouldRun(answers)) {
      await step.run.call(this, answers)
    }
  }
}

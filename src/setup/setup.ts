import Command from "@oclif/command"
import { QuestionnaireAnswers } from "../questionnaire/questionnaire"
import { Step } from "./step"
import { addBaseBabelConfigStep } from "./steps/add-base-babel-config"
import { addReadmeStep } from "./steps/add-readme"
import { createNextAppStep } from "./steps/create-next-app"
import { formatProjectStep } from "./steps/format-project"
import { installFormikStep } from "./steps/install-formik"
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

    // TODO: Add custom _app.tsx
    // TODO: Add custom index.tsx

    addReadmeStep,

    formatProjectStep,
  ]

  for (const step of steps) {
    if (step.shouldRun(answers)) {
      await step.run.call(this, answers)
    }
  }
}

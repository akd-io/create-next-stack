import Command from "@oclif/command"
import { QuestionnaireAnswers } from "../questionnaire/questionnaire"
import { Step } from "./step"
import { addBaseBabelConfigStep } from "./steps/add-base-babel-config"
import { createNextAppStep } from "./steps/create-next-app"
import { formatProjectStep } from "./steps/format-project"
import { initializeGitStep } from "./steps/initialize-git"
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

    initializeGitStep,

    removeOfficialCNAContentStep,

    addBaseBabelConfigStep,
    setUpEmotionStep,

    setUpPrettierStep,
    setUpLintStagedStep,

    // TODO: Add custom _app.tsx
    // TODO: Add custom index.tsx
    // TODO: Add custom README.md

    formatProjectStep,
  ]

  for (const step of steps) {
    if (step.shouldRun.call(this, answers)) {
      await step.run.call(this, answers)
    }
  }
}

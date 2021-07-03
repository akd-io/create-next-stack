import Command from "@oclif/command"
import { QuestionnaireAnswers } from "../questionnaire/questionnaire"
import { Step } from "./step"
import { addBaseBabelConfigStep } from "./steps/add-base-babel-config"
import { createNextAppStep } from "./steps/create-next-app"
import { formatProjectStep } from "./steps/format-project"
import { initializeGitStep } from "./steps/initialize-git"
import { removeOfficialCNAContentStep } from "./steps/remove-official-cna-content"
import { setupEmotionStep } from "./steps/setup-emotion"
import { setupLintStagedStep } from "./steps/setup-lint-staged"
import { setupPrettierStep } from "./steps/setup-prettier"
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
    setupEmotionStep,

    setupPrettierStep,
    setupLintStagedStep,

    // TODO: Add custom _app.tsx
    // TODO: Add custom index.tsx
    // TODO: Add custom README.md

    formatProjectStep,
  ]

  const stepsToRun = generateStepsToRun.call(this, steps, answers)

  for (const step of stepsToRun) {
    await step.run.call(this, answers)
  }
}

function generateStepsToRun(
  this: Command,
  steps: Step[],
  answers: QuestionnaireAnswers
) {
  const stepsToRun: Step[] = []

  a: while (true) {
    for (const step of steps) {
      let requirementsMet = true
      for (const dependency of step.dependencies) {
        if (!stepsToRun.includes(dependency)) {
          requirementsMet = false
        }
      }
      if (requirementsMet && step.shouldRun.call(this, answers)) {
        stepsToRun.push(step)
        steps.splice(steps.indexOf(step), 1)
        continue a
      }
    }
    break
  }

  return stepsToRun
}

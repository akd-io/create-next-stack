import Command from "@oclif/command"
import { QuestionnaireAnswers } from "../questionnaire/questionnaire"
import { Step } from "./step"
import { AddBaseBabelConfigStep } from "./steps/add-base-babel-config"
import { ChangeDirectoryStep } from "./steps/change-directory"
import { CreateNextAppStep } from "./steps/create-next-app"
import { FormatProjectStep } from "./steps/format-project"
import { InitializeGitStep } from "./steps/initialize-git"
import { RemoveOfficialCNAContentStep } from "./steps/remove-official-cna-content"
import { SetupEmotionStep } from "./steps/setup-emotion"
import { SetupLintStagedStep } from "./steps/setup-lint-staged"
import { SetupPrettierStep } from "./steps/setup-prettier"
import { UpdateYarnStep } from "./steps/update-yarn"

export async function performSetupSteps(
  this: Command,
  answers: QuestionnaireAnswers
): Promise<void> {
  const steps: Step[] = [
    UpdateYarnStep,
    CreateNextAppStep,

    ChangeDirectoryStep,

    InitializeGitStep,

    RemoveOfficialCNAContentStep,

    AddBaseBabelConfigStep,
    SetupEmotionStep,

    SetupPrettierStep,
    SetupLintStagedStep,

    // TODO: Add custom _app.tsx
    // TODO: Add custom index.tsx
    // TODO: Add custom README.md

    FormatProjectStep,
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

import Command from "@oclif/command"
import { QuestionnaireAnswers } from "./questionnaire"
import { createNextApp } from "./steps/create-next-app"
import { removeOfficialCNAContent } from "./steps/remove-official-cna-content"
import { updateYarn } from "./steps/update-yarn"

export const performSetupSteps = async function (
  this: Command,
  answers: QuestionnaireAnswers
): Promise<void> {
  await updateYarn.call(this)
  await createNextApp.call(this, answers.projectName)
  await removeOfficialCNAContent.call(this, answers.projectName)

  // TODO: Add custom _app.tsx
  // TODO: Add custom index.tsx
  // TODO: Add custom README.md
}

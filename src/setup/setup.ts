import Command from "@oclif/command"
import { QuestionnaireAnswers } from "../questionnaire/questionnaire"
import { createNextApp } from "./steps/create-next-app"
import { removeOfficialCNAContent } from "./steps/remove-official-cna-content"
import { setupEmotion } from "./steps/setup-emotion"
import { setupStyledComponents } from "./steps/setup-styled-components"
import { updateYarn } from "./steps/update-yarn"

export const performSetupSteps = async function (
  this: Command,
  answers: QuestionnaireAnswers
): Promise<void> {
  const { projectName, styling } = answers

  await updateYarn.call(this)

  await createNextApp.call(this, projectName)

  process.chdir(projectName)

  await removeOfficialCNAContent.call(this)

  if (styling === "Emotion") {
    await setupEmotion.call(this)
  } else if (styling === "styled-components") {
    await setupStyledComponents.call(this)
  }

  // TODO: Add custom _app.tsx
  // TODO: Add custom index.tsx
  // TODO: Add custom README.md
}

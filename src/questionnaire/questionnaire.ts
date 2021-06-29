import Command from "@oclif/command"
import { promptProjectName } from "./questions/project-name"
import { promptStyling } from "./questions/styling"

export type QuestionnaireAnswers = {
  projectName: string
  styling: "Emotion" | "styled-components"
}

export const performQuestionnaire = async function (
  this: Command
): Promise<QuestionnaireAnswers> {
  const projectName = await promptProjectName()
  const styling = await promptStyling()

  return {
    projectName,
    styling,
  }
}

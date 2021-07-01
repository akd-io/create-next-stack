import Command from "@oclif/command"
import { promptProjectName } from "./questions/project-name"

export type QuestionnaireAnswers = {
  projectName: string
}

export async function performQuestionnaire(
  this: Command
): Promise<QuestionnaireAnswers> {
  const projectName = await promptProjectName()

  return {
    projectName,
  }
}

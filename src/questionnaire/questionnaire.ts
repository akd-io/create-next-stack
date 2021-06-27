import Command from "@oclif/command"
import { promptProjectName } from "./questions/project-name"

export type QuestionnaireAnswers = {
  projectName: string
}

export const performQuestionnaire = async function (
  this: Command
): Promise<QuestionnaireAnswers> {
  const projectName = await promptProjectName()

  const answers = {
    projectName,
  }

  return answers
}

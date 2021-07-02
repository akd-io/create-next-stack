import Command from "@oclif/command"
import { promptProjectName } from "./questions/project-name"
import { promptTechnologies, TechValue } from "./questions/technologies"

export type QuestionnaireAnswers = {
  projectName: string
  technologies: TechValue[]
}

export async function performQuestionnaire(
  this: Command
): Promise<QuestionnaireAnswers> {
  const projectName = await promptProjectName()
  const technologies = await promptTechnologies()

  return {
    projectName,
    technologies,
  }
}

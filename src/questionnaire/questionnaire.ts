import Command from "@oclif/command"
import { promptProjectName } from "./questions/project-name"
import { promptTechnologies, TechValue } from "./questions/technologies"

export type QuestionnaireAnswers = {
  projectPath: string
  projectName: string
  technologies: TechValue[]
}

export async function performQuestionnaire(
  this: Command
): Promise<QuestionnaireAnswers> {
  const { projectName, projectPath } = await promptProjectName.call(this)
  const technologies = await promptTechnologies()

  return {
    projectPath,
    projectName,
    technologies,
  }
}

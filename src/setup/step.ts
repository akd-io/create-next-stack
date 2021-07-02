import Command from "@oclif/command"
import { QuestionnaireAnswers } from "../questionnaire/questionnaire"

export type Step = {
  dependencies: Step[]
  shouldRun: (this: Command, answers: QuestionnaireAnswers) => boolean
  run: (this: Command, answers: QuestionnaireAnswers) => Promise<void>
}

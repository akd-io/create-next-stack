import Command from "@oclif/command"
import { QuestionnaireAnswers } from "../questionnaire/questionnaire"

export type Step = {
  shouldRun: (answers: QuestionnaireAnswers) => boolean
  run: (this: Command, answers: QuestionnaireAnswers) => Promise<void>
}

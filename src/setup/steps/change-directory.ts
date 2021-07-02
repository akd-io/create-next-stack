import Command from "@oclif/command"
import { QuestionnaireAnswers } from "../../questionnaire/questionnaire"
import { Step } from "../step"
import { CreateNextAppStep } from "./create-next-app"

export const ChangeDirectoryStep: Step = {
  dependencies: [CreateNextAppStep],

  shouldRun: function (this) {
    return true
  },

  run: async function (
    this: Command,
    answers: QuestionnaireAnswers
  ): Promise<void> {
    process.chdir(answers.projectName)
  },
}

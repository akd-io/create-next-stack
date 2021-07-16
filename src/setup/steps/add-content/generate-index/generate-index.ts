import { QuestionnaireAnswers } from "../../../../questionnaire/questionnaire"
import { techValues } from "../../../../questionnaire/questions/technologies"
import { generateIndexWithCssModules } from "./generate-index-with-css-modules"
import { generateIndexWithCssModules } from "./with-css-modules/generate-index-with-css-modules"

export const generateIndex = (answers: QuestionnaireAnswers) => {
  if (answers.technologies.includes(techValues.emotion)) {
    return generateIndexWithEmotion(answers)
  } else {
    return generateIndexWithCssModules(answers)
  }
}

import { QuestionnaireAnswers } from "../../../../questionnaire/questionnaire"
import { techValues } from "../../../../questionnaire/questions/technologies"
import { generateIndexWithCssModules } from "./generate-index-with-css-modules"
import { generateIndexWithEmotion } from "./generate-index-with-emotion"

export const generateIndex = (answers: QuestionnaireAnswers) => {
  if (answers.technologies.includes(techValues.emotion)) {
    return generateIndexWithEmotion(answers)
  } else {
    return generateIndexWithCssModules(answers)
  }
}

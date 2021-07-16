import { QuestionnaireAnswers } from "../../../../questionnaire/questionnaire"
import { techValues } from "../../../../questionnaire/questions/technologies"
import { generateIndexWithCssInJs } from "./with-css-in-js/generate-index-with-css-in-js"
import { generateIndexWithCssModules } from "./with-css-modules/generate-index-with-css-modules"

export const generateIndex = (answers: QuestionnaireAnswers) => {
  if (
    answers.technologies.includes(techValues.emotion) ||
    answers.technologies.includes(techValues.styledComponents)
  ) {
    return generateIndexWithCssInJs(answers)
  } else if (answers.technologies.includes(techValues.cssModules)) {
    return generateIndexWithCssModules(answers)
  } else {
    throw new Error(
      "Unsupported styling technology found in generateIndex, or no styling technology was chosen."
    )
  }
}

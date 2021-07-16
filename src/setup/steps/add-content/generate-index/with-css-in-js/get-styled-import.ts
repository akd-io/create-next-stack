import { QuestionnaireAnswers } from "../../../../../questionnaire/questionnaire"
import { techValues } from "../../../../../questionnaire/questions/technologies"

export const getStyledImport = (answers: QuestionnaireAnswers) => {
  if (answers.technologies.includes(techValues.emotion)) {
    return `import styled from "@emotion/styled";`
  } else if (answers.technologies.includes(techValues.styledComponents)) {
    return `import styled from "styled-components";`
  } else {
    throw new Error(
      "Unsupported styled library found in getStyledImport, or no styled library was chosen."
    )
  }
}

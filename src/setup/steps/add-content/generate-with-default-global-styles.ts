import { QuestionnaireAnswers } from "../../../questionnaire/questionnaire"
import { globalStyles } from "./global-styles"

export const generateWithDefaultGlobalStyles = (
  answers: QuestionnaireAnswers
): string => /* tsx */ `
${getImport(answers)}
import React from "react";

${getGlobalStylesDeclaration(answers)}

const WithDefaultGlobalStyles: React.FC = ({ children }) => {
  return (
    <>
      ${getGlobalStylesComponent(answers)}
      {children}
    </>
  );
};

export default WithDefaultGlobalStyles;
`

const getImport = (answers: QuestionnaireAnswers): string => {
  if (answers.technologies.includes("emotion")) {
    return /* tsx */ `import { css, Global } from "@emotion/react";`
  } else if (answers.technologies.includes("styledComponents")) {
    return /* tsx */ `import { createGlobalStyle } from "styled-components";`
  } else {
    throw new Error("Unsupported styling technology found in getImport.")
  }
}

const getGlobalStylesDeclaration = (answers: QuestionnaireAnswers): string => {
  if (answers.technologies.includes("emotion")) {
    return /* tsx */ `
const globalStyles = css\`
${globalStyles}
\`;
`
  } else if (answers.technologies.includes("styledComponents")) {
    return /* tsx */ `
const GlobalStyle = createGlobalStyle\`
${globalStyles}
\`;
`
  } else {
    throw new Error(
      "Unsupported styling technology found in getGlobalStylesDeclaration."
    )
  }
}

const getGlobalStylesComponent = (answers: QuestionnaireAnswers): string => {
  if (answers.technologies.includes("emotion")) {
    return /* tsx */ `<Global styles={globalStyles} />`
  } else if (answers.technologies.includes("styledComponents")) {
    return /* tsx */ `<GlobalStyle />`
  } else {
    throw new Error(
      "Unsupported styling technology found in getGlobalStylesComponent."
    )
  }
}

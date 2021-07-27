import { ValidCNSInputs } from "../../../../create-next-stack-types"
import { globalStyles } from "../global-styles"

export const generateWithDefaultGlobalStyles = (
  inputs: ValidCNSInputs
): string => /* tsx */ `
${getImportsForGlobalStyling(inputs)}
import React from "react";

${getGlobalStylesDeclaration(inputs)}

const WithDefaultGlobalStyles: React.FC = ({ children }) => {
  return (
    <>
      ${getGlobalStylesComponent(inputs)}
      {children}
    </>
  );
};

export default WithDefaultGlobalStyles;
`

const getImportsForGlobalStyling = (inputs: ValidCNSInputs): string => {
  if (inputs.flags.styling === "emotion") {
    return /* tsx */ `import { css, Global } from "@emotion/react";`
  } else if (inputs.flags.styling === "styled-components") {
    return /* tsx */ `import { createGlobalStyle } from "styled-components";`
  } else {
    throw new Error("Unsupported styling technology found in getImport.")
  }
}

const getGlobalStylesDeclaration = (inputs: ValidCNSInputs): string => {
  if (inputs.flags.styling === "emotion") {
    return /* tsx */ `
const globalStyles = css\`
${globalStyles}
\`;
`
  } else if (inputs.flags.styling === "styled-components") {
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

const getGlobalStylesComponent = (inputs: ValidCNSInputs): string => {
  if (inputs.flags.styling === "emotion") {
    return /* tsx */ `<Global styles={globalStyles} />`
  } else if (inputs.flags.styling === "styled-components") {
    return /* tsx */ `<GlobalStyle />`
  } else {
    throw new Error(
      "Unsupported styling technology found in getGlobalStylesComponent."
    )
  }
}

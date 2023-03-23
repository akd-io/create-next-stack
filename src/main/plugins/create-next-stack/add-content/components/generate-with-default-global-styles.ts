import endent from "endent"
import { ValidCNSInputs } from "../../../../create-next-stack-types"
import { generateGlobalStyles } from "../styles/global-styles"

export const generateWithDefaultGlobalStyles = (
  inputs: ValidCNSInputs
): string => endent`
  ${getImportsForGlobalStyling(inputs)}
  import React from "react";

  ${getGlobalStylesDeclaration(inputs)}

  type WithDefaultGlobalStylesProps = {
    children: React.ReactNode;
  };
  const WithDefaultGlobalStyles: React.FC<WithDefaultGlobalStylesProps> = ({
    children,
  }) => {
    return (
      <>
        ${getGlobalStylesComponent(inputs)}
        {children}
      </>
    );
  };

  export default WithDefaultGlobalStyles;
`

const getImportsForGlobalStyling = ({ flags }: ValidCNSInputs): string => {
  if (flags.styling === "emotion") {
    return endent`import { css, Global } from "@emotion/react";`
  } else if (flags.styling === "styled-components") {
    return endent`import { createGlobalStyle } from "styled-components";`
  } else {
    throw new Error("Unsupported styling technology found in getImport.")
  }
}

const getGlobalStylesDeclaration = ({ flags }: ValidCNSInputs): string => {
  if (flags.styling === "emotion") {
    return endent`
      const globalStyles = css\`
        ${generateGlobalStyles()}
      \`;
    `
  } else if (flags.styling === "styled-components") {
    return endent`
      const GlobalStyle = createGlobalStyle\`
        ${generateGlobalStyles()}
      \`;
    `
  } else {
    throw new Error(
      "Unsupported styling technology found in getGlobalStylesDeclaration."
    )
  }
}

const getGlobalStylesComponent = ({ flags }: ValidCNSInputs): string => {
  if (flags.styling === "emotion") {
    return endent`<Global styles={globalStyles} />`
  } else if (flags.styling === "styled-components") {
    return endent`<GlobalStyle />`
  } else {
    throw new Error(
      "Unsupported styling technology found in getGlobalStylesComponent."
    )
  }
}

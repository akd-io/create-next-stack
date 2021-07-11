import { globalStyles } from "./global-styles"

export const generateWithDefaultGlobalStyles = (): string => /* tsx */ `
import { css, Global } from "@emotion/react";
import React from "react";

const globalStyles = css\`
${globalStyles}
\`;

const WithDefaultGlobalStyles: React.FC = ({ children }) => {
  return (
    <>
      <Global styles={globalStyles} />
      {children}
    </>
  );
};

export default WithDefaultGlobalStyles;
`

export const generateWithDefaultGlobalStyles = (): string => /* tsx */ `
import { css, Global } from "@emotion/react";
import React from "react";

const globalStyles = css\`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  code {
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
      DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
  }

  a {
    color: inherit;
    text-decoration: none;
    font-weight: bold;
  }

  * {
    box-sizing: border-box;
  }
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

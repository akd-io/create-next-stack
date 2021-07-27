import endent from "endent"
import { ValidCNSInputs } from "../../../../create-next-stack-types"

export const generatePage = (
  inputs: ValidCNSInputs
): string => endent/* tsx */ `
  import Head from "next/head";
  import React from "react";
  ${
    inputs.flags.styling === "emotion" ||
    inputs.flags.styling === "styled-components"
      ? `import WithDefaultGlobalStyles from "./WithDefaultGlobalStyles";`
      : ``
  }

  type PageProps = {
    title: string;
    description: string;
  };
  const Page: React.FC<PageProps> = ({ title, description, children }) => {
    return (
      ${
        inputs.flags.styling === "emotion" ||
        inputs.flags.styling === "styled-components"
          ? `<WithDefaultGlobalStyles>`
          : `<>`
      }
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {children}
      ${
        inputs.flags.styling === "emotion" ||
        inputs.flags.styling === "styled-components"
          ? `</WithDefaultGlobalStyles>`
          : `</>`
      }
    );
  };

  export default Page;
`

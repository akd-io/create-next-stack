import endent from "endent"
import { ValidCNSInputs } from "../../../create-next-stack-types"

export const generateApp = (inputs: ValidCNSInputs): string => endent/* tsx */ `
  import { AppProps } from "next/app";
  ${
    inputs.flags.styling === "css-modules"
      ? endent/* jsx */ `import "../styles/global-styles.css";`
      : ""
  }

  const CustomApp = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
  };

  export default CustomApp;
`

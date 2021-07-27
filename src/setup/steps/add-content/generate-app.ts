import endent from "endent"
import { ValidCNSInputs } from "../../../create-next-stack-types"

export const generateApp = (inputs: ValidCNSInputs): string => endent/* tsx */ `
  import { AppType } from "next/dist/next-server/lib/utils";
  ${
    inputs.flags.styling === "css-modules"
      ? endent/* jsx */ `import "../styles/global-styles.css";`
      : ""
  }

  const MyApp: AppType = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
  };

  export default MyApp;
`

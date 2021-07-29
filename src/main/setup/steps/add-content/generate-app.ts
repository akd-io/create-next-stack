import endent from "endent"
import { ValidCNSInputs } from "../../../create-next-stack-types"

export const generateApp = (inputs: ValidCNSInputs): string => endent/* tsx */ `
  import { AppProps } from "next/app";
  ${getGlobalStylesImport(inputs)}

  const CustomApp = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
  };

  export default CustomApp;
`

const getGlobalStylesImport = (inputs: ValidCNSInputs) => {
  const { styling } = inputs.flags
  if (styling === "css-modules" || styling === "css-modules-with-sass") {
    const extension = styling === "css-modules" ? "css" : "scss"
    return /* jsx */ `import "../styles/global-styles.${extension}";`
  } else {
    return ""
  }
}

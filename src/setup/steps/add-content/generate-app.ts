import { ValidCNSInputs } from "../../../create-next-stack-types"

export const generateApp = (inputs: ValidCNSInputs): string => /* tsx */ `
import { AppType } from "next/dist/next-server/lib/utils";
${
  inputs.flags.styling === "css-modules"
    ? `import "../styles/global-styles.css";`
    : ""
}

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
`

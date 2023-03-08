import endent from "endent"
import { ValidCNSInputs } from "../../../create-next-stack-types"

export const generateNextConfig = async (
  inputs: ValidCNSInputs
): Promise<string> => {
  return endent/* js */ `
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      reactStrictMode: true,
      compiler: {
        ${inputs.flags.styling === "emotion" ? "emotion: true," : ""}
        ${
          inputs.flags.styling === "styled-components"
            ? "styledComponents: true,"
            : ""
        }
      },
    };
    
    module.exports = nextConfig;  
  `
}

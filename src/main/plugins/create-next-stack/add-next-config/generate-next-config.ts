import endent from "endent"
import { ValidCNSInputs } from "../../../create-next-stack-types"
import { filterPlugins } from "../../../setup/setup"

export const generateNextConfig = async (
  inputs: ValidCNSInputs
): Promise<string> => {
  const compilerOptions = filterPlugins(inputs).reduce(
    (acc, plugin) => ({
      ...acc,
      ...plugin.compilerOptions,
    }),
    {}
  )

  const compilerOptionsString = JSON.stringify(compilerOptions, null, 2)

  return endent/* js */ `
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      reactStrictMode: true,
      compiler: ${compilerOptionsString},
    };
    
    module.exports = nextConfig;  
  `
}

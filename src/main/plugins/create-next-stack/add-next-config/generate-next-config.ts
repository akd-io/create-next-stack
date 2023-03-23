import endent from "endent"
import { ValidCNSInputs } from "../../../create-next-stack-types"
import { stringify } from "../../../helpers/stringify"
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

  return endent`
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      reactStrictMode: true,
      compiler: ${stringify(compilerOptions)},
    };
    
    module.exports = nextConfig;  
  `
}

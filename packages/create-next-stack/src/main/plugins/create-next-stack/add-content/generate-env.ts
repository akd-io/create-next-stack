import endent from "endent"
import { ValidCNSInputs } from "../../../create-next-stack-types"
import { getEnvironmentVariables } from "../sort-orders/environment-variables"

export const generateEnv = async (inputs: ValidCNSInputs): Promise<string> => {
  const environmentVariables = (await getEnvironmentVariables(inputs))
    .map((environmentVariable) => {
      const { name, description, defaultValue } = environmentVariable

      return endent`
        # ${description}
        ${name}=${defaultValue}
      `
    })
    .join("\n")

  return endent`
    ${environmentVariables}
  `
}

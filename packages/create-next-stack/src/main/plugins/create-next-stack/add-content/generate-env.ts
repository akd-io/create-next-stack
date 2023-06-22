import endent from "endent"
import { ValidCNSInputs } from "../../../create-next-stack-types"
import { getEnvironmentVariables } from "../sort-orders/environment-variables"

export const generateEnv = (inputs: ValidCNSInputs): string => {
  const environmentVariables = getEnvironmentVariables(inputs)
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

import endent from "endent"
import { ValidCNSInputs } from "../../../create-next-stack-types"
import { getSortedFilteredEnvironmentVariables } from "../sort-orders/environment-variables"

export const generateEnv = (inputs: ValidCNSInputs): string => {
  const environmentVariables = getSortedFilteredEnvironmentVariables(inputs)
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

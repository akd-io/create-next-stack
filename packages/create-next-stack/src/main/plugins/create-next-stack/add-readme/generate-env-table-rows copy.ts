import { ValidCNSInputs } from "../../../create-next-stack-types"
import { getEnvironmentVariables } from "../sort-orders/environment-variables"

export const generateEnvironmentVariableTableRows = async (
  inputs: ValidCNSInputs
): Promise<string | null> => {
  const environmentVariables = getEnvironmentVariables(inputs)
  if (environmentVariables.length === 0) {
    return null
  }
  const environmentVariableRowsString = environmentVariables
    .map(
      (environmentVariable) =>
        `|\`${environmentVariable.name}\`|${environmentVariable.description}|`
    )
    .join("\n")
  return environmentVariableRowsString
}

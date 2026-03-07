import aldent from "aldent"
import { ValidCNSInputs } from "../../../create-next-stack-types.ts"
import { getEnvironmentVariables } from "../sort-orders/environment-variables.ts"

export const generateEnv = async (inputs: ValidCNSInputs): Promise<string> => {
  const environmentVariables = (await getEnvironmentVariables(inputs))
    .map((environmentVariable) => {
      const { name, description, defaultValue } = environmentVariable

      return aldent`
        # ${description}
        ${name}=${defaultValue}
      `
    })
    .join("\n")

  return aldent`
    ${environmentVariables}
  `
}

import { ValidCNSInputs } from "../../../create-next-stack-types.ts"
import { getScripts } from "../sort-orders/scripts.ts"

export const generateScriptTableRows = async (
  inputs: ValidCNSInputs,
): Promise<string | null> => {
  const scripts = await getScripts(inputs)
  if (scripts.length === 0) {
    return null
  }
  const scriptRowsString = scripts
    .map((script) => `|\`${script.name}\`|${script.description}|`)
    .join("\n")
  return scriptRowsString
}

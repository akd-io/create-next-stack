import { ValidCNSInputs } from "../../../create-next-stack-types"
import { getSortedFilteredScripts } from "../sort-orders/scripts"

export const generateScriptTableRows = async (
  inputs: ValidCNSInputs
): Promise<string | null> => {
  const scripts = getSortedFilteredScripts(inputs)
  if (scripts.length === 0) {
    return null
  }
  const scriptRowsString = scripts
    .map((script) => `|\`${script.name}\`|${script.description}|`)
    .join("\n")
  return scriptRowsString
}

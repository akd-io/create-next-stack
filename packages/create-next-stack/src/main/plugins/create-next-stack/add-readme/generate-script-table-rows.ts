import { ValidCNSInputs } from "../../../create-next-stack-types"
import { getSortedFilteredScripts } from "../scripts/sort-order"

export const generateScriptTableRows = async (
  inputs: ValidCNSInputs
): Promise<string> => {
  const scripts = getSortedFilteredScripts(inputs)
  const scriptRowsString = scripts
    .map((script) => `|\`${script.name}\`|${script.description}|`)
    .join("\n")
  return scriptRowsString
}

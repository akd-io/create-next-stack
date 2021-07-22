import { ValidCNSInputs } from "../../../../create-next-stack-types"
import { generateIndexWithCssInJs } from "./with-css-in-js/generate-index-with-css-in-js"
import { generateIndexWithCssModules } from "./with-css-modules/generate-index-with-css-modules"

export const generateIndex = (inputs: ValidCNSInputs) => {
  if (
    inputs.flags.styling === "emotion" ||
    inputs.flags.styling === "styled-components"
  ) {
    return generateIndexWithCssInJs(inputs)
  } else if (inputs.flags.styling === "css-modules") {
    return generateIndexWithCssModules(inputs)
  } else {
    throw new Error(
      "Unsupported styling technology found in generateIndex, or no styling technology was chosen."
    )
  }
}

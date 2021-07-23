import { ValidCNSInputs } from "../../../../../create-next-stack-types"

export const getStyledImport = (inputs: ValidCNSInputs) => {
  if (inputs.flags.styling === "emotion") {
    return `import styled from "@emotion/styled";`
  } else if (inputs.flags.styling === "styled-components") {
    return `import styled from "styled-components";`
  } else {
    throw new Error(
      "Unsupported styled library found in getStyledImport, or no styled library was chosen."
    )
  }
}

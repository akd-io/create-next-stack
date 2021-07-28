import { ValidCNSInputs } from "../create-next-stack-types"

export type Step = {
  shouldRun: (inputs: ValidCNSInputs) => Promise<boolean>
  run: (inputs: ValidCNSInputs) => Promise<void>
  didRun: boolean
}

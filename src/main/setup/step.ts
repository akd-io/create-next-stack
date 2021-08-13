import { ValidCNSInputs } from "../create-next-stack-types"

// TODO: Create Step factory, such that implementations' didRun property is set automatically. shouldRun can also be made optional at that point.

export type Step = {
  /**
   * `description` should be written in present continuous tense, without punctuation, and with a lowercase first letter unless the description starts with a name or similar.
   */
  description: string
  shouldRun: (inputs: ValidCNSInputs) => Promise<boolean>
  run: (inputs: ValidCNSInputs) => Promise<void>
  didRun: boolean
}

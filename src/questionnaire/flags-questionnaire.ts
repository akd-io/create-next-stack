import { ValidCreateNextStackFlags } from "../create-next-stack-types"
import { promptTechnologies } from "./questions/technologies"

export const performFlagsQuestionnaire =
  async (): Promise<ValidCreateNextStackFlags> => {
    // TODO
    const technologies = await promptTechnologies()

    return {
      styling: "emotion",
    }
  }

import { ValidCreateNextStackFlags } from "../create-next-stack-types"
import { ThenArg } from "../helpers/then-arg"
import { withKeyConstraint } from "../helpers/with-key-constraint"
import { CategoryValue, promptOptionalCategories } from "./questions/categories"
import { promptAnimation } from "./questions/categories/animation"
import { promptContinuousIntegration } from "./questions/categories/continuous-integration"
import { promptFormStateManagement } from "./questions/categories/form-state-management"
import { promptFormatting } from "./questions/categories/formatting"
import {
  MiscellaneousValue,
  promptMiscellaneous,
} from "./questions/categories/miscellaneous"
import { promptPackageManager } from "./questions/categories/package-manager"
import { promptStyling } from "./questions/categories/styling"

const categoryToPromptFunction = withKeyConstraint<CategoryValue>()({
  formatting: promptFormatting,
  formStateManagement: promptFormStateManagement,
  animation: promptAnimation,
  continuousIntegration: promptContinuousIntegration,
} as const)

type PromptReturnType = ThenArg<
  ReturnType<typeof categoryToPromptFunction[CategoryValue]>
>
export type OptionalTechnology = PromptReturnType extends Array<unknown>
  ? PromptReturnType[number]
  : PromptReturnType

export const performFlagsQuestionnaire =
  async (): Promise<ValidCreateNextStackFlags> => {
    // Mandatory prompts
    const packageManager = await promptPackageManager()
    const stylingMethod = await promptStyling()

    // Optional categories prompt
    const optionalCategories = await promptOptionalCategories()
    const optionalTechnologies = new Set<OptionalTechnology>()
    for (const category of optionalCategories) {
      const additionalTechnologies = await categoryToPromptFunction[category]()
      additionalTechnologies.forEach((tech) => optionalTechnologies.add(tech))
    }

    // TODO: Remove prettier-check when promptMiscellaneous adds more options
    let miscellaneous: Set<MiscellaneousValue> = new Set()
    if (optionalTechnologies.has("prettier")) {
      miscellaneous = await promptMiscellaneous(optionalTechnologies)
    }

    return {
      "package-manager": packageManager,
      styling: stylingMethod,
      prettier: optionalTechnologies.has("prettier"),
      "formatting-pre-commit-hook": miscellaneous.has("preCommitHook"),
      "react-hook-form": optionalTechnologies.has("reactHookForm"),
      formik: optionalTechnologies.has("formik"),
      "framer-motion": optionalTechnologies.has("framerMotion"),
      "github-actions": optionalTechnologies.has("githubActions"),
    }
  }

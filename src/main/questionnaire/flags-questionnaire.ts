import { ValidCreateNextStackFlags } from "../create-next-stack-types"
import { ThenArg } from "../helpers/then-arg"
import { withKeyConstraint } from "../helpers/with-key-constraint"
import { Writable } from "../helpers/writable"
import { CategoryValue, promptOptionalCategories } from "./questions/categories"
import { promptContinuousIntegration } from "./questions/categories/continuous-integration"
import { promptFormStateManagement } from "./questions/categories/form-state-management"
import { promptFormatting } from "./questions/categories/formatting"
import { promptPackageManager } from "./questions/categories/package-manager"
import { promptStyling } from "./questions/categories/styling"
import { promptTechnologies } from "./questions/technologies"

const categoryToPromptFunction = withKeyConstraint<CategoryValue>()({
  formatting: promptFormatting,
  formStateManagement: promptFormStateManagement,
  animation: async () => ["placeholder"] as const, // TODO: Implement
  continuousIntegration: promptContinuousIntegration,
} as const)

type PromptReturnType = Writable<
  // TODO: Remove Writable when all functions above are added.
  ThenArg<ReturnType<typeof categoryToPromptFunction[CategoryValue]>>
>
type TechnologyOption = PromptReturnType extends Array<unknown>
  ? PromptReturnType[number]
  : PromptReturnType

export const performFlagsQuestionnaire =
  async (): Promise<ValidCreateNextStackFlags> => {
    // Mandatory prompts
    const packageManager = await promptPackageManager()
    const stylingMethod = await promptStyling()

    // Optional categories prompt
    const optionalCategories = await promptOptionalCategories()

    const technologies = new Set<TechnologyOption>()
    for (const category of optionalCategories) {
      const additionalTechnologies = await categoryToPromptFunction[category]()
      additionalTechnologies.forEach((tech) => technologies.add(tech))
    }

    const oldTechnologies = await promptTechnologies()

    return {
      "package-manager": packageManager,
      styling: stylingMethod,
      prettier: technologies.has("prettier"),
      "formatting-pre-commit-hook": oldTechnologies.includes("preCommitHook"),
      "react-hook-form": technologies.has("reactHookForm"),
      formik: technologies.has("formik"),
      "framer-motion": oldTechnologies.includes("framerMotion"),
      "github-actions": technologies.has("githubActions"),
    }
  }

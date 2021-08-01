import {
  PackageManagerOption,
  StylingOption,
  ValidCreateNextStackFlags,
} from "../create-next-stack-types"
import { ThenArg } from "../helpers/then-arg"
import { withKeyConstraint } from "../helpers/with-key-constraint"
import { Writable } from "../helpers/writable"
import { CategoryValue, promptCategories } from "./questions/categories"
import { promptContinuousIntegration } from "./questions/categories/continuous-integration"
import { promptFormatting } from "./questions/categories/formatting"
import { promptTechnologies } from "./questions/technologies"

const categoryToPromptFunction = withKeyConstraint<CategoryValue>()({
  formatting: promptFormatting,
  animation: async () => ["placeholder"] as const, // TODO: Implement
  continuousIntegration: promptContinuousIntegration,
  formStateManagement: async () => ["placeholder"] as const, // TODO: Implement
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
    const categories = await promptCategories()

    const technologies = new Set<TechnologyOption>()
    for (const category of categories) {
      const additionalTechnologies = await categoryToPromptFunction[category]()
      additionalTechnologies.forEach((tech) => technologies.add(tech))
    }

    const oldTechnologies = await promptTechnologies()

    return {
      "package-manager": getPackageManager(oldTechnologies),
      styling: getStyling(oldTechnologies),
      prettier: technologies.has("prettier"),
      "formatting-pre-commit-hook": oldTechnologies.includes("preCommitHook"),
      "react-hook-form": oldTechnologies.includes("reactHookForm"),
      formik: oldTechnologies.includes("formik"),
      "framer-motion": oldTechnologies.includes("framerMotion"),
      "github-actions": technologies.has("githubActions"),
    }
  }

const getPackageManager = (
  technologies: ThenArg<ReturnType<typeof promptTechnologies>>
): PackageManagerOption => {
  // TODO: Strengthen typing. TypeScript throw error here when new package manager is added in promptTechnologies.
  if (technologies.includes("yarn")) {
    return "yarn"
  } else if (technologies.includes("npm")) {
    return "npm"
  } else {
    throw new Error("Package manager not found or not supported.")
  }
}

const getStyling = (
  technologies: ThenArg<ReturnType<typeof promptTechnologies>>
): StylingOption => {
  // TODO: Strengthen typing. TypeScript throw error here when new styling method is added in promptTechnologies.
  if (technologies.includes("emotion")) {
    return "emotion"
  } else if (technologies.includes("styledComponents")) {
    return "styled-components"
  } else if (technologies.includes("cssModules")) {
    return "css-modules"
  } else if (technologies.includes("cssModulesWithSass")) {
    return "css-modules-with-sass"
  } else {
    throw new Error("Styling method not found or not supported.")
  }
}

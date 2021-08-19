import { ValidCreateNextStackFlags } from "../create-next-stack-types"
import { withKeyConstraint } from "../helpers/with-key-constraint"
import { CategoryValue, promptOptionalCategories } from "./questions/categories"
import {
  AnimationValue,
  promptAnimation,
} from "./questions/categories/animation"
import {
  ComponentLibraryValue,
  promptComponentLibraries,
} from "./questions/categories/component-libraries"
import {
  ContinuousIntegrationValue,
  promptContinuousIntegration,
} from "./questions/categories/continuous-integration"
import {
  FormStateManagementValue,
  promptFormStateManagement,
} from "./questions/categories/form-state-management"
import {
  FormattingValue,
  promptFormatting,
} from "./questions/categories/formatting"
import {
  MiscellaneousValue,
  promptMiscellaneous,
} from "./questions/categories/miscellaneous"
import {
  PackageManagerValue,
  promptPackageManager,
} from "./questions/categories/package-manager"
import { promptStyling, StylingValue } from "./questions/categories/styling"

const categoryToPromptFunction = withKeyConstraint<CategoryValue>()({
  formatting: promptFormatting,
  componentLibraries: promptComponentLibraries,
  formStateManagement: promptFormStateManagement,
  animation: promptAnimation,
  continuousIntegration: promptContinuousIntegration,
} as const)

export type Technology =
  | AnimationValue
  | ComponentLibraryValue
  | ContinuousIntegrationValue
  | FormStateManagementValue
  | FormattingValue
  | MiscellaneousValue
  | PackageManagerValue
  | StylingValue

export const performFlagsQuestionnaire =
  async (): Promise<ValidCreateNextStackFlags> => {
    const technologies = new Set<Technology>()

    // Mandatory prompts
    const packageManager = await promptPackageManager()
    technologies.add(packageManager)
    const stylingMethod = await promptStyling()
    technologies.add(stylingMethod)

    // Optional categories prompt
    const optionalCategories = await promptOptionalCategories()
    for (const category of optionalCategories) {
      const optionalTechnologies = await categoryToPromptFunction[category](
        technologies
      )
      optionalTechnologies.forEach((tech) => technologies.add(tech))
    }

    // TODO: Remove prettier-check when promptMiscellaneous adds more options
    let miscellaneous: Set<MiscellaneousValue> = new Set()
    if (technologies.has("prettier")) {
      miscellaneous = await promptMiscellaneous(technologies)
      miscellaneous.forEach((tech) => technologies.add(tech))
    }

    const result: Required<
      Omit<ValidCreateNextStackFlags, "help" | "version" | "debug">
    > = {
      "package-manager": packageManager,
      styling: stylingMethod,
      prettier: technologies.has("prettier"),
      "react-hook-form": technologies.has("reactHookForm"),
      formik: technologies.has("formik"),
      "framer-motion": technologies.has("framerMotion"),
      "github-actions": technologies.has("githubActions"),
      "formatting-pre-commit-hook": miscellaneous.has(
        "formattingPreCommitHook"
      ),
      chakra: technologies.has("chakra"),
      mUI: technologies.has("material-ui"),
    }

    return result
  }

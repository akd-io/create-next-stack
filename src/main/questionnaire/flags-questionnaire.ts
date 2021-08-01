import {
  PackageManagerOption,
  StylingOption,
  ValidCreateNextStackFlags,
} from "../create-next-stack-types"
import { promptTechnologies } from "./questions/technologies"

export const performFlagsQuestionnaire =
  async (): Promise<ValidCreateNextStackFlags> => {
    const technologies = await promptTechnologies()

    return {
      "package-manager": getPackageManager(technologies),
      prettier: technologies.includes("prettier"),
      styling: getStyling(technologies),
      "react-hook-form": technologies.includes("reactHookForm"),
      formik: technologies.includes("formik"),
      "framer-motion": technologies.includes("framerMotion"),
      "github-actions": technologies.includes("githubActions"),
      "formatting-pre-commit-hook": technologies.includes("preCommitHook"),
    }
  }

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T

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

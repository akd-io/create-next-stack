import { ValidCNSInputs } from "../../../create-next-stack-types"
import { compareByOrder } from "../../../helpers/sort-by-order"
import { filterPlugins } from "../../../setup/setup"

export const technologiesSortOrder: string[] = [
  "next",
  "react",
  "typescript",
  "emotion",
  "styledComponents",
  "tailwindCSS",
  "sass",
  "cssModules",
  "chakraUI",
  "materialUI",
  "reactHookForm",
  "formik",
  "framerMotion",
  "eslint",
  "prettier",
  "husky",
  "lintStaged",
  "pnpm",
  "yarn",
  "npm",
  "githubActions",
  "reactIcons",
]

export const getSortedFilteredTechnologies = (inputs: ValidCNSInputs) => {
  const technologies = filterPlugins(inputs).flatMap(
    (plugin) => plugin.technologies ?? []
  )
  const dedupedTechnologies = [...new Set(technologies)]
  return dedupedTechnologies.sort((a, b) =>
    compareByOrder(a.name, b.name, technologiesSortOrder)
  )
}

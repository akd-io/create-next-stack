import { ValidCNSInputs } from "../../../create-next-stack-types"
import { DeeplyReadonly } from "../../../helpers/deeply-readonly"
import { compareByOrder } from "../../../helpers/sort-by-order"
import { Technology } from "../../../plugin"
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

export const getTechnologies = (
  inputs: ValidCNSInputs
): Array<Omit<DeeplyReadonly<Technology>, "id">> => {
  return filterPlugins(inputs)
    .flatMap((plugin) => plugin.technologies ?? [])
    .sort((a, b) => compareByOrder(a.id, b.id, technologiesSortOrder))
    .map(({ id, ...rest }) => ({
      ...rest,
    }))
}

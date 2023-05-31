import { ValidCNSInputs } from "../../../create-next-stack-types"
import { DeeplyReadonly } from "../../../helpers/deeply-readonly"
import { compareByOrder } from "../../../helpers/sort-by-order"
import { Technology } from "../../../plugin"
import { filterPlugins, plugins } from "../../../setup/setup"

export const technologiesSortOrder: string[] = [
  "next",
  "react",
  "typescript",
  "emotion",
  "styledComponents",
  "tailwindCSS",
  "sass",
  "cssModules",
  "mantine",
  "chakraUI",
  "materialUI",
  "framerMotion",
  "reactHookForm",
  "formik",
  "reactQuery",
  "reactIcons",
  "eslint",
  "prettier",
  "husky",
  "lintStaged",
  "pnpm",
  "yarn",
  "npm",
  "githubActions",
  "plausible",
  "next-plausible",
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

export const getAllTechnologies = (): Array<
  Omit<DeeplyReadonly<Technology>, "id">
> => {
  return plugins
    .flatMap((plugin) => plugin.technologies ?? [])
    .sort((a, b) => compareByOrder(a.id, b.id, technologiesSortOrder))
    .map(({ id, ...rest }) => ({
      ...rest,
    }))
}

import type { ValidCNSInputs } from "../../../create-next-stack-types.ts"
import { nonNull } from "../../../helpers/non-null.ts"
import { compareByOrder } from "../../../helpers/sort-by-order.ts"
import type { Technology } from "../../../plugin.ts"
import { filterPlugins, plugins } from "../../../setup/setup.ts"

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
  "nextPlausible",
  "vercel",
  "netlify",
  "prisma",
]

export const getTechnologies = async (
  inputs: ValidCNSInputs,
): Promise<Array<Omit<Technology, "id">>> => {
  return (await filterPlugins(inputs))
    .flatMap((plugin) => plugin.technologies)
    .filter(nonNull)
    .sort((a, b) => compareByOrder(a.id, b.id, technologiesSortOrder))
    .map(({ id: _, ...rest }) => ({
      ...rest,
    }))
}

export const getAllTechnologies = (): Array<Omit<Technology, "id">> => {
  return plugins
    .flatMap((plugin) => plugin.technologies ?? [])
    .sort((a, b) => compareByOrder(a.id, b.id, technologiesSortOrder))
    .map(({ id: _, ...rest }) => ({
      ...rest,
    }))
}

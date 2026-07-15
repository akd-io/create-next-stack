import type { Plugin } from "../plugin.ts"

export const prettierPluginOrganizeImportsPackage = {
  name: "prettier-plugin-organize-imports",
  version: "^4.0.0",
}

export const prettierPluginOrganizeImportsPlugin: Plugin = {
  id: "prettier-plugin-organize-imports",
  name: "prettier-plugin-organize-imports",
  description:
    "Adds support for prettier-plugin-organize-imports, which automatically organizes imports using the TypeScript language service.",
  active: ({ flags }) =>
    Boolean(flags.prettier && flags["prettier-plugin-organize-imports"]),
  devDependencies: [prettierPluginOrganizeImportsPackage],
  technologies: [
    {
      id: "prettier-plugin-organize-imports",
      name: "prettier-plugin-organize-imports",
      description:
        "prettier-plugin-organize-imports is a Prettier plugin that automatically organizes imports using the TypeScript language service. It removes unused imports and sorts them according to TypeScript's own import organization logic.",
      links: [
        {
          title: "Website",
          url: "https://www.npmjs.com/package/prettier-plugin-organize-imports",
        },
        {
          title: "GitHub",
          url: "https://github.com/simonhaenisch/prettier-plugin-organize-imports",
        },
      ],
    },
  ],
}

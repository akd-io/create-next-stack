import { modifyJsonFile, toArray } from "../helpers/io"
import { Package, Plugin } from "../plugin"

export const prettierPackage = {
  name: "prettier",
  version: "^2.0.0",
} satisfies Package

export const prettierPlugin: Plugin = {
  id: "prettier",
  name: "Prettier",
  description: "Adds support for Prettier",
  active: ({ flags }) => Boolean(flags.prettier),
  devDependencies: [
    prettierPackage,
    { name: "eslint-config-prettier", version: "^8.0.0" },
  ],
  technologies: [
    {
      id: "prettier",
      name: "Prettier",
      description:
        "Prettier is a tool for formatting code. It is optimized for readability and consistency, and its opinionated nature ensures developers won't spent time debating code formatting configurations. Prettier normally runs in a pre-commit hook to ensure code is formatted before it is committed.",
      links: [
        { title: "Website", url: "https://prettier.io/" },
        { title: "Docs", url: "https://prettier.io/docs/en/index.html" },
        { title: "Options", url: "https://prettier.io/docs/en/options.html" },
        { title: "GitHub", url: "https://github.com/prettier/prettier" },
      ],
    },
  ],
  scripts: [
    {
      name: "format",
      description: "Formats all source code in the project.",
      command: "prettier --write --ignore-path=.gitignore .",
    },
    {
      name: "format:check",
      description: "Checks the formatting of all code in the project.",
      command: "prettier --check --ignore-path=.gitignore .",
    },
  ],
  addFiles: [
    {
      destination: ".prettierrc",
      content: `{}`,
    },
  ],
  steps: [
    {
      id: "setUpPrettier",
      description: "setting up Prettier",
      run: async () => {
        await modifyJsonFile(".eslintrc.json", (eslintrc) => ({
          ...eslintrc,
          extends: [
            //
            ...toArray(eslintrc["extends"]),
            "eslint-config-prettier",
          ],
        }))
      },
    },
  ],
} as const

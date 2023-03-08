import { constrain } from "../helpers/constrain"
import { modifyJsonFile, toArray, writeJsonFile } from "../helpers/io"
import { Plugin } from "../plugin"
import { runCommand } from "../run-command"
import { getNameVersionCombo } from "../setup/packages"

export const prettierPlugin = constrain<Plugin>()({
  name: "Prettier",
  description: "Adds support for Prettier",
  devDependencies: {
    prettier: { name: "prettier", version: "^2.0.0" },
    "eslint-config-prettier": {
      name: "eslint-config-prettier",
      version: "^8.0.0",
    },
  },
  technologies: [
    {
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
  steps: {
    setup: {
      description: "setting up Prettier",
      shouldRun: async ({ flags }) => Boolean(flags.prettier),
      run: async () => {
        await Promise.all([addPrettierConfig(), setUpEslintConfigPrettier()])
      },
    },
    formatProject: {
      description: "formatting project",
      shouldRun: true, // Always run this step, even if the user didn't select Prettier.
      run: async () => {
        await runCommand("npx", [
          getNameVersionCombo(prettierPlugin.devDependencies.prettier),
          "--write",
          ".",
        ])
      },
    },
  },
} as const)

const addPrettierConfig = async () => {
  const prettierConfig = {} // Only provide overrides in this config. Not setting Prettier's defaults explicitly is preferred, so our rules will follow Prettier's defaults as much as possible.

  await writeJsonFile(".prettierrc", prettierConfig)
}

const setUpEslintConfigPrettier = async () => {
  await modifyJsonFile(".eslintrc.json", (eslintrc) => ({
    ...eslintrc,
    extends: [
      //
      ...toArray(eslintrc["extends"]),
      "eslint-config-prettier",
    ],
  }))
}

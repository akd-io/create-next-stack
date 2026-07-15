import type { Plugin } from "../plugin.ts"

export const eslintStrictPlugin: Plugin = {
  id: "eslint-strict",
  name: "ESLint Strict (typescript-eslint)",
  description:
    "Adds strict type-checked linting via typescript-eslint (strict-type-checked + stylistic-type-checked)",
  active: ({ flags }) => Boolean(flags["eslint-strict"]),
  devDependencies: [{ name: "typescript-eslint", version: "^8.0.0" }],
  technologies: [
    {
      id: "typescript-eslint",
      name: "typescript-eslint",
      description:
        "typescript-eslint is the tooling that enables ESLint to run on TypeScript code. It provides a parser, plugin, and configurable rule sets ranging from recommended to strict type-checked rules.",
      links: [
        {
          title: "Website",
          url: "https://typescript-eslint.io/",
        },
        {
          title: "Configs",
          url: "https://typescript-eslint.io/linting/configs",
        },
        {
          title: "GitHub",
          url: "https://github.com/typescript-eslint/typescript-eslint",
        },
      ],
    },
  ],
}

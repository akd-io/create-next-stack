import { Plugin } from "../plugin"

export const eslintPlugin: Plugin = {
  id: "eslint",
  name: "ESLint",
  description: "Adds relevant documentation for ESLint",
  active: true,
  technologies: [
    {
      id: "eslint",
      name: "ESLint",
      description:
        "ESLint is a tool for linting JavaScript and TypeScript code. It is used to check for errors in code and to enforce coding conventions. It can be configured to use custom rule sets and is often run both by code editors during development as well as in CI/CD.",
      links: [
        { title: "Website", url: "https://eslint.org/" },
        {
          title: "Configuration",
          url: "https://eslint.org/docs/user-guide/configuring/",
        },
        { title: "Rules", url: "https://eslint.org/docs/rules/" },
        { title: "GitHub", url: "https://github.com/eslint/eslint" },
      ],
    },
  ],
}

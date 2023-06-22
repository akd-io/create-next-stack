import { runCommand } from "../helpers/run-command"
import { Plugin } from "../plugin"
import { getNameVersionCombo } from "../setup/packages"

export const pnpmPlugin: Plugin = {
  id: "pnpm",
  name: "pnpm",
  description: "Adds support for pnpm",
  active: ({ flags }) => Boolean(flags["package-manager"] === "pnpm"),
  technologies: [
    {
      id: "pnpm",
      name: "pnpm",
      description:
        "pnpm is a JavaScript package manager compatible with the npm registry that performs better than Yarn and npm by using hard links and symlinks to allow package caching across projects.",
      links: [
        { title: "Website", url: "https://pnpm.io/" },
        { title: "Docs", url: "https://pnpm.io/motivation" },
        { title: "GitHub", url: "https://github.com/pnpm/pnpm" },
      ],
    },
  ],
  steps: [
    {
      id: "updatePnpm",
      description: "updating pnpm",
      run: async () => {
        await runCommand("npm", [
          "i",
          "-g",
          getNameVersionCombo({ name: "pnpm", version: "latest" }),
        ])
      },
    },
  ],
} as const

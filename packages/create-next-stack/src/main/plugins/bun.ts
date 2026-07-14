import { runCommand } from "../helpers/run-command.ts"
import type { Plugin } from "../plugin.ts"

export const bunPlugin: Plugin = {
  id: "bun",
  name: "Bun",
  description: "Adds support for Bun",
  active: ({ flags }) => Boolean(flags["package-manager"] === "bun"),
  technologies: [
    {
      id: "bun",
      name: "Bun",
      description:
        "Bun is an all-in-one toolkit for JavaScript and TypeScript apps. It ships as a single binary that implements a fast package manager, a bundler, a test runner, and a runtime built on JavaScriptCore. Bun is designed as a drop-in replacement for Node.js and is compatible with most npm packages.",
      links: [
        { title: "Website", url: "https://bun.sh/" },
        { title: "Docs", url: "https://bun.sh/docs" },
        { title: "GitHub", url: "https://github.com/oven-sh/bun" },
      ],
    },
  ],
  steps: [
    {
      id: "updateBun",
      description: "updating Bun",
      run: async () => {
        await runCommand("bun", ["upgrade"])
      },
    },
  ],
}

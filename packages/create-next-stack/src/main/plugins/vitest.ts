import type { Plugin } from "../plugin.ts"

export const vitestPackage = {
  name: "vitest",
  version: "^4.0.0",
} as const

export const vitestPlugin: Plugin = {
  id: "vitest",
  name: "Vitest",
  description: "Adds support for Vitest",
  active: ({ flags }) => Boolean(flags["vitest"]),
  devDependencies: [vitestPackage],
  technologies: [
    {
      id: "vitest",
      name: "Vitest",
      description:
        "Vitest is a blazing fast unit-test framework powered by Vite. It provides a Jest-compatible API, native ESM and TypeScript support, and watch mode out of the box. Vitest integrates seamlessly with Vite-powered projects, sharing the same configuration and transform pipeline.",
      links: [
        { title: "Website", url: "https://vitest.dev/" },
        { title: "Docs", url: "https://vitest.dev/guide/" },
        { title: "GitHub", url: "https://github.com/vitest-dev/vitest" },
      ],
    },
  ],
  scripts: [
    {
      name: "test",
      description: "Runs unit tests with Vitest.",
      command: "vitest run",
    },
    {
      name: "test:watch",
      description: "Runs unit tests in watch mode.",
      command: "vitest",
    },
    {
      name: "test:ci",
      description: "Runs unit tests with verbose output for CI.",
      command: "vitest run --reporter=verbose",
    },
  ],
  addFiles: [
    {
      destination: "vitest.config.ts",
      content: `import { defineConfig } from "vitest/config"\n\nexport default defineConfig({\n  test: {\n    environment: "node",\n  },\n})\n`,
    },
  ],
}

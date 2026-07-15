import type { Plugin } from "../plugin.ts"

export const playwrightPlugin: Plugin = {
  id: "playwright",
  name: "Playwright",
  description: "Adds support for Playwright",
  active: ({ flags }) => Boolean(flags.playwright),
  devDependencies: [{ name: "@playwright/test", version: "^1.50.0" }],
  technologies: [
    {
      id: "playwright",
      name: "Playwright",
      description:
        "Playwright is a fast, reliable end-to-end testing framework that enables cross-browser testing across Chromium, Firefox, and WebKit with a single API. It provides auto-waiting, network interception, trace viewer, and codegen for generating tests from interactions.",
      links: [
        { title: "Website", url: "https://playwright.dev/" },
        { title: "Docs", url: "https://playwright.dev/docs/intro" },
        { title: "GitHub", url: "https://github.com/microsoft/playwright" },
      ],
    },
  ],
  scripts: [
    {
      name: "test:e2e",
      description: "Runs end-to-end tests with Playwright.",
      command: "playwright test",
    },
    {
      name: "test:e2e:ui",
      description: "Runs Playwright tests in interactive UI mode.",
      command: "playwright test --ui",
    },
  ],
  addFiles: [
    {
      destination: "playwright.config.ts",
      content: `import { defineConfig, devices } from "@playwright/test"\n\nexport default defineConfig({\n  testDir: "./e2e",\n  fullyParallel: true,\n  forbidOnly: !!process.env.CI,\n  retries: process.env.CI ? 2 : 0,\n  workers: process.env.CI ? 1 : undefined,\n  reporter: "html",\n  use: {\n    baseURL: "http://localhost:3000",\n    trace: "on-first-retry",\n  },\n  projects: [\n    {\n      name: "chromium",\n      use: { ...devices["Desktop Chrome"] },\n    },\n  ],\n  webServer: {\n    command: "npm run dev",\n    url: "http://localhost:3000",\n    reuseExistingServer: !process.env.CI,\n  },\n})\n`,
    },
  ],
}

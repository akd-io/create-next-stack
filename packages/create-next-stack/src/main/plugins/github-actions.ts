import endent from "endent"
import { ValidCNSInputs } from "../create-next-stack-types"
import {
  cleanInstallCommandMap,
  runCommandMap,
} from "../helpers/package-manager-utils"
import { evalProperty, Plugin } from "../plugin"
import { prettierPlugin } from "./prettier"

export const githubActionsPlugin: Plugin = {
  id: "github-actions",
  name: "GitHub Actions",
  description: "Adds support for GitHub Actions",
  active: ({ flags }) => Boolean(flags["github-actions"]),
  technologies: [
    {
      id: "githubActions",
      name: "GitHub Actions",
      description:
        "GitHub Actions is a tool for automating software development workflows. It is integrated with GitHub repositories and enables developers to automate tasks such as building, testing, and deploying their applications.",
      links: [
        { title: "Website", url: "https://github.com/features/actions" },
        { title: "Docs", url: "https://docs.github.com/en/actions" },
        {
          title: "Workflow syntax",
          url: "https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions",
        },
      ],
    },
  ],
  scripts: [
    {
      // TODO: When testing libraries are supported, make them add the test script. Somehow make this plugin only add `test` script if no other testing plugin has done so. Currently added so the github-actions workflow won't fail when calling the `test` npm script.
      name: "test",
      description: "Runs tests",
      command: "echo No tests found.",
    },
  ],
  addFiles: [
    {
      destination: ".github/workflows/ci.yml",
      content: (inputs) => generateCiYml(inputs),
    },
  ],
} as const

const generateCiYml = async (inputs: ValidCNSInputs): Promise<string> => {
  const { flags } = inputs
  const packageManager = flags["package-manager"]

  const isPrettierPluginActive = await evalProperty(
    prettierPlugin.active,
    inputs
  )

  return endent`
    name: "CI"

    on: [pull_request]

    jobs:
      build:
        name: "Build, lint, and test"

        runs-on: ubuntu-latest

        steps:
          - name: "Checkout repo"
            uses: actions/checkout@v3

          ${
            packageManager === "pnpm"
              ? endent`
                  - name: "Set up pnpm"
                    uses: pnpm/action-setup@v2
                    with:
                      version: 8
                `
              : ""
          }

          - name: "Set up latest Node LTS"
            uses: actions/setup-node@v2
            with:
              node-version: "lts/*"
              cache: "${packageManager}"

          - name: "Install dependencies"
            run: ${cleanInstallCommandMap[packageManager]}

          ${
            isPrettierPluginActive
              ? endent`
                  - name: "Check format"
                    run: ${runCommandMap[packageManager]} format:check
                `
              : ""
          }

          - name: "Build"
            run: ${runCommandMap[packageManager]} build

          - name: "Lint"
            run: ${runCommandMap[packageManager]} lint

          - name: "Test"
            run: ${runCommandMap[packageManager]} test
  `
}

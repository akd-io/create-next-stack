import endent from "endent"
import fs from "fs/promises"
import path from "path"
import { ValidCNSInputs } from "../create-next-stack-types"
import { constrain } from "../helpers/constrain"
import { writeFile } from "../helpers/io"
import { Plugin } from "../plugin"

export const githubActionsPlugin = constrain<Plugin>()({
  name: "GitHub Actions",
  description: "Adds support for GitHub Actions",
  technologies: [
    {
      name: "GitHub Actions",
      description:
        "GitHub Actions is a tool for automating software development workflows. It is integrated with GitHub repositories and enables developers to automate tasks such as building, testing, and deploying their applications.",
      links: [
        {
          title: "Website",
          url: "https://github.com/features/actions",
        },
        {
          title: "Docs",
          url: "https://docs.github.com/en/actions",
        },
        {
          title: "Workflow syntax",
          url: "https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions",
        },
      ],
    },
  ],
  steps: {
    addGithubWorkflowStep: {
      description: "adding GitHub workflow",

      shouldRun: async ({ flags }) => Boolean(flags["github-actions"]),

      run: async (inputs) => {
        const directory = ".github/workflows"
        const filename = "ci.yml"
        await fs.mkdir(directory, { recursive: true })
        const filePath = path.resolve(`${directory}/${filename}`)
        await writeFile(filePath, generateCiYml(inputs))
      },
    },
  },
} as const)

const generateCiYml = ({ flags }: ValidCNSInputs): string => {
  const packageManager: "yarn" | "npm" = flags["package-manager"]
  const installCommand = packageManager === "yarn" ? "yarn install" : "npm ci"
  const runCommand = packageManager === "yarn" ? "yarn" : "npm run"

  return endent/* yml */ `
    name: "CI"

    on: [pull_request]

    jobs:
      build:
        name: ${
          flags.prettier
            ? "Check format, lint, build, and test"
            : "Lint, build, and test"
        }

        runs-on: ubuntu-latest

        steps:
          - name: "Checkout repo"
            uses: actions/checkout@v2

          - name: "Use latest Node LTS"
            uses: actions/setup-node@v2
            with:
              node-version: "lts/*"
              cache: "${packageManager}"

          - name: "Install dependencies"
            run: ${installCommand}

          ${
            flags.prettier
              ? endent/* yml */ `
                  - name: "Check format"
                    run: ${runCommand} format:check
                `
              : ""
          }

          - name: "Lint"
            run: ${runCommand} lint

          - name: "Build"
            run: ${runCommand} build

          - name: "Test"
            run: ${runCommand} test
  `
}

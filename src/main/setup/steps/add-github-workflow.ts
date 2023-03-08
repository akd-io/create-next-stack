import endent from "endent"
import { promises as fs } from "fs"
import path from "path"
import { ValidCNSInputs } from "../../create-next-stack-types"
import { constrain } from "../../helpers/constrain"
import { writeFile } from "../../helpers/io"
import { Step } from "../../plugin"

export const addGithubWorkflowStep = constrain<Step>()({
  description: "adding GitHub workflow",

  shouldRun: async ({ flags }) => Boolean(flags["github-actions"]),

  run: async (inputs) => {
    const directory = ".github/workflows"
    const filename = "ci.yml"
    await fs.mkdir(directory, { recursive: true })
    const filePath = path.resolve(`${directory}/${filename}`)
    await writeFile(filePath, generateCiYml(inputs))
  },
})

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

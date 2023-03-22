import { constrain } from "../helpers/constrain"
import { modifyJsonFile } from "../helpers/io"
import { isGitInitialized } from "../helpers/is-git-initialized"
import { remove } from "../helpers/remove"
import { logWarning } from "../logging"
import { Plugin } from "../plugin"
import { runCommand } from "../run-command"

export const lintStagedPlugin = constrain<Plugin>()({
  name: "lint-staged",
  description: "Adds support for Husky and lint-staged using mrm",
  tmpDependencies: {
    mrm: {
      name: "mrm",
      version: "^4.0.0",
    },
    "mrm-task-lint-staged": {
      name: "mrm-task-lint-staged",
      version: "^7.0.0",
    },
  },
  technologies: [
    {
      name: "Husky",
      description:
        "Husky uses git hooks to let you run code at specific times in your git workflow. It is mainly used to format and lint code in a pre-commit hook to ensure committed code is formatted and free of error.",
      links: [
        { title: "Website", url: "https://typicode.github.io/husky/" },
        { title: "Docs", url: "https://typicode.github.io/husky/" },
        { title: "GitHub", url: "https://github.com/typicode/husky" },
      ],
    },
    {
      name: "lint-staged",
      description:
        "lint-staged is a tool for running commands on staged files in a git repository. It is mainly used to filter out files that aren't staged during a formatting or linting pre-commit hook.",
      links: [
        { title: "Website", url: "https://github.com/okonet/lint-staged" },
        { title: "GitHub", url: "https://github.com/okonet/lint-staged" },
      ],
    },
  ],
  scripts: [
    {
      name: `prepare`,
      description:
        "The [`prepare` life cycle script](https://docs.npmjs.com/cli/v7/using-npm/scripts#life-cycle-scripts) is used to set up Git pre-commit hooks when people install dependencies, eg. using `npm install`. This script should not be run manually.",
      command: "husky install",
    },
  ],
  steps: {
    setup: {
      description: "setting up lint-staged",
      shouldRun: async ({ flags }) => {
        if (!flags.prettier || !flags["formatting-pre-commit-hook"]) {
          return false
        }
        if (!(await isGitInitialized())) {
          logWarning("Skipping lint-staged setup, as Git was not initialized.")
          return false
        }
        return true
      },
      run: async () => {
        await runCommand("npx", ["mrm", "lint-staged"])
        await remove("7")
        await modifyJsonFile("package.json", (packageJson) => ({
          ...packageJson,
          "lint-staged": {
            "*": "prettier --write --ignore-unknown",
          },
        }))
      },
    },
  },
} as const)

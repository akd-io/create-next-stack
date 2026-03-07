import { writeFile } from "../helpers/io"
import { isGitInitialized } from "../helpers/is-git-initialized"
import { runCommand } from "../helpers/run-command"
import { logWarning } from "../logging"
import { Plugin } from "../plugin"

export const formattingPreCommitHookPlugin: Plugin = {
  id: "formatting-pre-commit-hook",
  name: "formatting-pre-commit-hook",
  description:
    "Adds support for a formatting pre-commit hook by setting up Husky and lint-staged",
  active: ({ flags }) =>
    Boolean(flags.prettier && flags["formatting-pre-commit-hook"]),
  devDependencies: [
    { name: "lint-staged", version: "^16.0.0" },
    { name: "husky", version: "^9.0.0" },
  ],
  technologies: [
    {
      id: "husky",
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
      id: "lintStaged",
      name: "lint-staged",
      description:
        "lint-staged is a tool for running commands on staged files in a git repository. It is mainly used to filter out files that aren't staged during a formatting or linting pre-commit hook.",
      links: [
        { title: "Website", url: "https://github.com/lint-staged/lint-staged" },
        { title: "GitHub", url: "https://github.com/lint-staged/lint-staged" },
      ],
    },
  ],
  scripts: [
    {
      name: `prepare`,
      description:
        "The [`prepare` life cycle script](https://docs.npmjs.com/cli/v7/using-npm/scripts#life-cycle-scripts) is used to set up Git pre-commit hooks when people install dependencies, eg. using `npm install`. This script should not be run manually.",
      command: "husky",
    },
  ],
  steps: [
    {
      id: "setUpFormattingPreCommitHook",
      description: "setting up formatting pre-commit hook",
      shouldRun: async () => {
        if (!(await isGitInitialized())) {
          logWarning(
            "Skipping formatting pre-commit hook setup, as Git was not initialized.",
          )
          return false
        }
        return true
      },
      run: async () => {
        await runCommand("npx", ["husky", "init"])
        await writeFile(".husky/pre-commit", "npx lint-staged\n")
      },
    },
  ],
  addFiles: [
    {
      destination: ".lintstagedrc",
      content: `{ "*": "prettier --write --ignore-unknown" }`,
    },
  ],
}

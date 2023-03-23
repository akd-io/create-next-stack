import { createPlugin } from "../plugin"
import { runCommand } from "../run-command"
import { getNameVersionCombo } from "../setup/packages"

export const yarnPlugin = createPlugin({
  name: "Yarn",
  description: "Adds support for Yarn",
  active: ({ flags }) => Boolean(flags["package-manager"] === "yarn"),
  dependencies: { yarn: { name: "yarn", version: "^1.0.0" } },
  technologies: [
    {
      name: "Yarn",
      description:
        "Yarn is a JavaScript package manager compatible with the npm registry that helps developers automate the process around npm packages such as installing, updating, removing, and more.",
      links: [
        { title: "Website", url: "https://yarnpkg.com/" },
        { title: "CLI Docs", url: "https://yarnpkg.com/cli" },
        { title: "GitHub", url: "https://github.com/yarnpkg/berry" },
      ],
    },
  ],
  steps: {
    updateYarn: {
      description: "updating Yarn",
      run: async () => {
        await runCommand("npm", [
          "i",
          "-g",
          getNameVersionCombo(yarnPlugin.dependencies.yarn),
        ])
      },
    },
  },
} as const)

import { runCommand } from "../helpers/run-command"
import { Plugin } from "../plugin"
import { getNameVersionCombo } from "../setup/packages"

export const yarnPlugin: Plugin = {
  id: "yarn",
  name: "Yarn",
  description: "Adds support for Yarn",
  active: ({ flags }) => Boolean(flags["package-manager"] === "yarn"),
  technologies: [
    {
      id: "yarn",
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
  steps: [
    {
      id: "updateYarn",
      description: "updating Yarn",
      run: async () => {
        await runCommand("npm", [
          "i",
          "-g",
          getNameVersionCombo({ name: "yarn", version: "latest" }),
        ])
      },
    },
  ],
}

import { constrain } from "../helpers/constrain"
import { modifyJsonFile, toObject } from "../helpers/io"
import { Plugin } from "../plugin"
import { filterPlugins } from "../setup/setup"

export const createNextStackPlugin = constrain<Plugin>()({
  name: "Create Next Stack",
  description:
    "Adds various miscellaneous steps. Some necessities, some niceties.",
  steps: {
    addScripts: {
      description: "adding scripts to package.json",
      run: async (inputs) => {
        const scripts = filterPlugins(inputs).flatMap(
          (plugin) => plugin.scripts ?? []
        )

        // TODO: Add a scripts sort order here. Use TypeScript to force setting all plugin scripts.

        await modifyJsonFile("package.json", (packageJson) => ({
          ...packageJson,
          scripts: {
            ...toObject(packageJson["scripts"]),
            ...scripts.reduce(
              (acc, script) => ({
                ...acc,
                [script.name]: script.command,
              }),
              {}
            ),
          },
        }))
      },
    },
  },
} as const)

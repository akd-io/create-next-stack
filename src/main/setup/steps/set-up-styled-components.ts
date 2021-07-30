import { readJsonFile } from "../../helpers/read-json-file"
import { writeJsonFile } from "../../helpers/write-json-file"
import { install, packages } from "../packages"
import { Step } from "../step"

export const setUpStyledComponentsStep: Step = {
  description: "setting up styled-components",

  shouldRun: async ({ flags }) => flags.styling === "styled-components",

  didRun: false,

  run: async ({ flags }) => {
    await install(packages["styled-components"], flags["package-manager"])
    await install(
      [
        packages["@types/styled-components"],
        packages["babel-plugin-styled-components"],
      ],
      flags["package-manager"],
      {
        dev: true,
      }
    )

    await addStyledComponentsBabelPlugin()
  },
}

/**
 * Adds the babel-plugin-styled-components as per the docs at https://styled-components.com/docs/tooling#babel-plugin
 * Note quote from the docs:
 * > The plugin call order in your .babelrc file matters. If you're using the env property in your babel configuration,
 *   then putting this plugin into the plugins array won't suffice. Instead it needs to be put into each env's plugins array
 *   to maintain it being executed first. See [this](https://github.com/styled-components/babel-plugin-styled-components/issues/78) for more information.
 */
const addStyledComponentsBabelPlugin = async () => {
  const babelrcFilePath = ".babelrc"
  const babelConfig = await readJsonFile(babelrcFilePath)

  const styledComponentsEntry = ["babel-plugin-styled-components"]
  if (Array.isArray(babelConfig.plugins)) {
    babelConfig.plugins = [styledComponentsEntry, ...babelConfig.plugins]
  } else {
    babelConfig.plugins = [styledComponentsEntry]
  }

  await writeJsonFile(babelrcFilePath, babelConfig)
}

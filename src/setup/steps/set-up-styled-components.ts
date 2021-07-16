import execa from "execa"
import fs from "fs/promises"
import { throwError } from "../../error-handling"
import { isUnknownObject } from "../../helpers/is-unknown-object"
import { writeJsonFile } from "../../helpers/write-json-file"
import { techValues } from "../../questionnaire/questions/technologies"
import { packages } from "../packages"
import { Step } from "../step"

export const setUpStyledComponentsStep: Step = {
  shouldRun: (answers) =>
    answers.technologies.includes(techValues.styledComponents),

  run: async function (this) {
    this.log("Setting up styled-components...")

    try {
      await execa(`yarn add ${packages["styled-components"]}`)
      await execa(
        `yarn add --dev ${packages["babel-plugin-styled-components"]}`
      )

      await addStyledComponentsBabelPlugin()
    } catch (error) {
      throwError.call(
        this,
        "An error occurred while setting up styled-components.",
        error
      )
    }
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
  const babelrcFileName = ".babelrc"
  const babelrcString = await fs.readFile(babelrcFileName, "utf8")
  const babelConfig = JSON.parse(babelrcString)

  if (!isUnknownObject(babelConfig)) {
    throw new TypeError("Expected babelConfig to be an object.")
  }

  const styledComponentsEntry = ["babel-plugin-styled-components"]
  if (Array.isArray(babelConfig.plugins)) {
    babelConfig.plugins = [styledComponentsEntry, ...babelConfig.plugins]
  } else {
    babelConfig.plugins = [styledComponentsEntry]
  }

  await writeJsonFile(babelrcFileName, babelConfig)
}

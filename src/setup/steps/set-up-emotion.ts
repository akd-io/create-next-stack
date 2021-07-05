import execa from "execa"
import fs from "fs/promises"
import { throwError } from "../../error-handling"
import { isUnknownObject } from "../../helpers/is-unknown-object"
import { writeJsonFile } from "../../helpers/write-json-file"
import { emotionValue } from "../../questionnaire/questions/technologies"
import { Step } from "../step"

export const setUpEmotionStep: Step = {
  shouldRun: (answers) => answers.technologies.includes(emotionValue),

  run: async function (this) {
    this.log("Setting up Emotion...")

    try {
      await execa("yarn add @emotion/react @emotion/styled")
      await execa("yarn add --dev @emotion/babel-plugin")

      const babelrcString = await fs.readFile(".babelrc", "utf8")
      const babelConfig = JSON.parse(babelrcString)

      if (!isUnknownObject(babelConfig)) {
        throw new TypeError("Expected babelConfig to be an object.")
      }

      // Add css-prop support as per Next.js-specific Emotion docs: https://emotion.sh/docs/css-prop#babel-preset
      if (!Array.isArray(babelConfig.presets)) {
        throw new TypeError("Expected babelConfig.presets to be an array.")
      }
      const presets = babelConfig.presets
      if (!Array.isArray(presets[0])) {
        throw new TypeError("Expected babelConfig.presets[0] to be an array.")
      }
      if (presets[0][0] !== "next/babel") {
        throw new TypeError(
          `Expected babelConfig.presets[0][0] to be "next/babel".`
        )
      }
      const nextBabelPresetTuple = presets[0]
      if (!isUnknownObject(nextBabelPresetTuple[1])) {
        throw new TypeError(
          "Expected babelConfig.presets[0][1] to be an object."
        )
      }
      const presetNameToConfigMap = nextBabelPresetTuple[1]
      presetNameToConfigMap["preset-react"] = {
        runtime: "automatic",
        importSource: "@emotion/react",
      }

      // Add Emotion's Babel plugin as per their docs: https://emotion.sh/docs/install#babelrc
      if (Array.isArray(babelConfig.plugins)) {
        babelConfig.plugins = ["@emotion", ...babelConfig.plugins]
      } else {
        babelConfig.plugins = ["@emotion"]
      }

      await writeJsonFile(".babelrc", babelConfig)

      // Add TypeScript support for the css-prop as per the docs: https://emotion.sh/docs/typescript#css-prop
      const tsConfigString = await fs.readFile("tsconfig.json", "utf8")
      const tsConfig = JSON.parse(tsConfigString)

      if (!isUnknownObject(tsConfig)) {
        throw new TypeError("Expected tsConfig to be an object.")
      }
      if (!isUnknownObject(tsConfig.compilerOptions)) {
        throw new TypeError(
          "Expected tsConfig.compilerOptions to be an object."
        )
      }

      tsConfig.compilerOptions.jsxImportSource = "@emotion/react"

      await writeJsonFile("tsconfig.json", tsConfig)
    } catch (error) {
      throwError.call(
        this,
        "An error occurred while setting up Emotion.",
        error
      )
    }
  },
}

import { promises as fs } from "fs"
import { throwError } from "../../error-handling"
import { isUnknownObject } from "../../helpers/is-unknown-object"
import { writeJsonFile } from "../../helpers/write-json-file"
import { techValues } from "../../questionnaire/questions/technologies"
import { packages, yarnAdd } from "../packages"
import { Step } from "../step"

export const setUpEmotionStep: Step = {
  shouldRun: (answers) => answers.technologies.includes(techValues.emotion),

  run: async function (this) {
    this.log("Setting up Emotion...")

    try {
      await yarnAdd([packages["@emotion/react"], packages["@emotion/styled"]])
      await yarnAdd(packages["@emotion/babel-plugin"], { dev: true })

      await addCssPropSupportAsPerEmotionDocs()
      await addTypeScriptSupportForTheEmotionCssProp()
    } catch (error) {
      throwError.call(
        this,
        "An error occurred while setting up Emotion.",
        error
      )
    }
  },
}

/**
 * Add `css` prop support as per the Emotion docs.
 */
const addCssPropSupportAsPerEmotionDocs = async () => {
  const babelrcFileName = ".babelrc"
  const babelrcString = await fs.readFile(babelrcFileName, "utf8")
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
    throw new TypeError("Expected babelConfig.presets[0][1] to be an object.")
  }
  const presetNameToConfigMap = nextBabelPresetTuple[1]
  presetNameToConfigMap["preset-react"] = {
    runtime: "automatic",
    importSource: "@emotion/react",
  }

  // Add Emotion's Babel plugin as per their docs: https://emotion.sh/docs/install#babelrc
  // Note quote from the docs:
  // > "@emotion" must be the first plugin in your babel config `plugins` list.
  const emotionEntry = "@emotion"
  if (Array.isArray(babelConfig.plugins)) {
    babelConfig.plugins = [emotionEntry, ...babelConfig.plugins]
  } else {
    babelConfig.plugins = [emotionEntry]
  }

  await writeJsonFile(babelrcFileName, babelConfig)
}

/**
 *  Add TypeScript support for the css-prop as per the docs: https://emotion.sh/docs/typescript#css-prop
 */
const addTypeScriptSupportForTheEmotionCssProp = async () => {
  const tsConfigFileName = "tsconfig.json"
  const tsConfigString = await fs.readFile(tsConfigFileName, "utf8")
  const tsConfig = JSON.parse(tsConfigString)

  if (!isUnknownObject(tsConfig)) {
    throw new TypeError("Expected tsConfig to be an object.")
  }
  if (!isUnknownObject(tsConfig.compilerOptions)) {
    throw new TypeError("Expected tsConfig.compilerOptions to be an object.")
  }

  tsConfig.compilerOptions.jsxImportSource = "@emotion/react"

  await writeJsonFile(tsConfigFileName, tsConfig)
}

import { isUnknownObject } from "../../helpers/is-unknown-object"
import { readJsonFile } from "../../helpers/read-json-file"
import { writeJsonFile } from "../../helpers/write-json-file"
import { install, packages } from "../packages"
import { Step } from "../step"

export const setUpEmotionStep: Step = {
  description: "setting up Emotion",

  shouldRun: async ({ flags }) => flags.styling === "emotion",

  didRun: false,

  run: async ({ flags }) => {
    await install(
      [packages["@emotion/react"], packages["@emotion/styled"]],
      flags["package-manager"]
    )
    await install(packages["@emotion/babel-plugin"], flags["package-manager"], {
      dev: true,
    })

    await addCssPropSupportAsPerEmotionDocs()
    await addTypeScriptSupportForTheEmotionCssProp()
  },
}

/**
 * Add `css` prop support as per the Emotion docs.
 */
const addCssPropSupportAsPerEmotionDocs = async () => {
  const babelrcFilePath = ".babelrc"
  const babelConfig = await readJsonFile(babelrcFilePath)

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

  await writeJsonFile(babelrcFilePath, babelConfig)
}

/**
 *  Add TypeScript support for the css-prop as per the docs: https://emotion.sh/docs/typescript#css-prop
 */
const addTypeScriptSupportForTheEmotionCssProp = async () => {
  const tsConfigFilePath = "tsconfig.json"
  const tsConfig = await readJsonFile(tsConfigFilePath)

  if (!isUnknownObject(tsConfig.compilerOptions)) {
    throw new TypeError("Expected tsConfig.compilerOptions to be an object.")
  }

  tsConfig.compilerOptions.jsxImportSource = "@emotion/react"

  await writeJsonFile(tsConfigFilePath, tsConfig)
}

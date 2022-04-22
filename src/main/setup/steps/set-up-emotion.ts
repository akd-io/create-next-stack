import { isUnknownArray } from "../../helpers/is-unknown-array"
import { isUnknownObject } from "../../helpers/is-unknown-object"
import { modifyJsonFile, toArray, toObject } from "../../helpers/io"
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
  await modifyJsonFile(".babelrc", (babelConfig) => {
    // Add css-prop support as per Next.js-specific Emotion docs: https://emotion.sh/docs/css-prop#babel-preset
    const { presets } = babelConfig
    if (!isUnknownArray(presets)) {
      throw new TypeError("Expected babelConfig.presets to be an array.")
    }
    const [nextBabelPresetTuple] = presets
    if (!isUnknownArray(nextBabelPresetTuple)) {
      throw new TypeError("Expected babelConfig.presets[0] to be an array.")
    }
    const [nextBabelTextField, nextBabelConfig] = nextBabelPresetTuple
    if (nextBabelTextField !== "next/babel") {
      throw new TypeError(
        `Expected babelConfig.presets[0][0] to be "next/babel".`
      )
    }
    if (!isUnknownObject(nextBabelConfig)) {
      throw new TypeError("Expected babelConfig.presets[0][1] to be an object.")
    }
    const presetNameToConfigMap = nextBabelConfig
    presetNameToConfigMap["preset-react"] = {
      runtime: "automatic",
      importSource: "@emotion/react",
    }

    // Add Emotion's Babel plugin as per their docs: https://emotion.sh/docs/install#babelrc
    // Note quote from the docs:
    // > "@emotion" must be the first plugin in your babel config `plugins` list.
    babelConfig["plugins"] = ["@emotion", ...toArray(babelConfig["plugins"])]

    return babelConfig
  })
}

/**
 *  Add TypeScript support for the css-prop as per the docs: https://emotion.sh/docs/typescript#css-prop
 */
const addTypeScriptSupportForTheEmotionCssProp = async () => {
  await modifyJsonFile("tsconfig.json", (tsConfig) => ({
    ...tsConfig,
    compilerOptions: {
      ...toObject(tsConfig["compilerOptions"]),
      jsxImportSource: "@emotion/react",
    },
  }))
}

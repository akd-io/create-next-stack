import { modifyJsonFile, toObject } from "../../helpers/io"
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

    await addTypeScriptSupportForTheEmotionCssProp()
  },
}

/**
 *  Add TypeScript support for the css-prop as per the Emotion docs: https://emotion.sh/docs/typescript#css-prop
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

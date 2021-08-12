import {
  modifyJsonFile,
  toArray,
  toObject,
  writeJsonFile,
} from "../../helpers/json-files"
import { install, packages } from "../packages"
import { Step } from "../step"

export const setUpPrettierStep: Step = {
  description: "setting up Prettier",

  shouldRun: async ({ flags }) => Boolean(flags.prettier),

  didRun: false,

  run: async ({ flags }) => {
    await install(
      [packages.prettier, packages["eslint-config-prettier"]],
      flags["package-manager"],
      {
        dev: true,
      }
    )

    await Promise.all([
      addPrettierConfig(),
      addFormatScriptsToPackageJson(),
      setUpEslintConfigPrettier(),
    ])
  },
}

const addPrettierConfig = async () => {
  const prettierConfig = {} // Only provide overrides in this config. Not setting Prettier's defaults explicitly is preferred, so our rules will follow Prettier's defaults as much as possible.

  await writeJsonFile(".prettierrc", prettierConfig)
}

const addFormatScriptsToPackageJson = async () => {
  await modifyJsonFile("package.json", (packageJson) => ({
    ...packageJson,
    scripts: {
      ...toObject(packageJson["scripts"]),
      format: "prettier --write --ignore-path=.gitignore .",
      ["format:check"]: "prettier --check --ignore-path=.gitignore .",
    },
  }))
}

const setUpEslintConfigPrettier = async () => {
  await modifyJsonFile(".eslintrc.json", (eslintrc) => ({
    ...eslintrc,
    extends: [
      //
      ...toArray(eslintrc["extends"]),
      "eslint-config-prettier",
    ],
  }))
}

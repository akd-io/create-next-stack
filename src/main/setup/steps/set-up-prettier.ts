import { promises as fs } from "fs"
import { isUnknownObject } from "../../helpers/is-unknown-object"
import { writeJsonFile } from "../../helpers/write-json-file"
import { install, packages } from "../packages"
import { Step } from "../step"

export const setUpPrettierStep: Step = {
  description: "setting up Prettier",

  shouldRun: async (inputs) => Boolean(inputs.flags.prettier),

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
  const packageJsonFileName = "package.json"
  const packageJsonString = await fs.readFile(packageJsonFileName, "utf8")
  const packageJson = JSON.parse(packageJsonString)

  if (!isUnknownObject(packageJson)) {
    throw new TypeError("Expected packageJson to be an object.")
  }
  if (!isUnknownObject(packageJson.scripts)) {
    throw new TypeError("Expected packageJson.scripts to be an object.")
  }

  packageJson.scripts.format = "prettier --write --ignore-path=.gitignore ."
  packageJson.scripts["format:check"] =
    "prettier --check --ignore-path=.gitignore ."

  await writeJsonFile(packageJsonFileName, packageJson)
}

const setUpEslintConfigPrettier = async () => {
  const eslintFileName = ".eslintrc"
  const eslintrcString = await fs.readFile(eslintFileName, "utf8")
  const eslintrc = JSON.parse(eslintrcString)

  if (!isUnknownObject(eslintrc)) {
    throw new TypeError("Expected packageJson to be an object.")
  }
  if (!Array.isArray(eslintrc.extends)) {
    throw new TypeError("Expected packageJson.scripts to be an array.")
  }

  eslintrc.extends.push("eslint-config-prettier")

  await writeJsonFile(eslintFileName, eslintrc)
}

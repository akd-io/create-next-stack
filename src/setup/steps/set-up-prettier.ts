import { promises as fs } from "fs"
import { exitWithError } from "../../helpers/exit-with-error"
import { isUnknownObject } from "../../helpers/is-unknown-object"
import { writeJsonFile } from "../../helpers/write-json-file"
import { commandInstance } from "../../instance"
import { packages, yarnAdd } from "../packages"
import { Step } from "../step"

export const setUpPrettierStep: Step = {
  shouldRun: async (inputs) => Boolean(inputs.flags.prettier),

  run: async () => {
    const instance = commandInstance.get()
    instance.log("Setting up Prettier...")

    try {
      await yarnAdd([packages.prettier, packages["eslint-config-prettier"]], {
        dev: true,
      })

      await Promise.all([
        addPrettierConfig(),
        addFormatScriptsToPackageJson(),
        setUpEslintConfigPrettier(),
      ])
    } catch (error) {
      exitWithError("An error occurred while setting up Prettier.", error)
    }
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

import endent from "endent"
import path from "path"
import { copyDirectory } from "../../helpers/copy-directory"
import { getCreateNextStackDir } from "../../helpers/get-create-next-stack-dir"
import {
  makeDirectory,
  modifyJsonFile,
  toObject,
  writeFile,
} from "../../helpers/io"
import { isGitInitialized } from "../../helpers/is-git-initialized"
import { remove } from "../../helpers/remove"
import { runCommand } from "../../helpers/run-command"
import { logWarning } from "../../logging"
import { createPlugin } from "../../plugin"
import { getNameVersionCombo, install, uninstall } from "../../setup/packages"
import { filterPlugins } from "../../setup/setup"
import { prettierPlugin } from "../prettier"
import { generateApp } from "./add-content/pages/generate-app"
import { generateDocument } from "./add-content/pages/generate-document"
import { generateIndexPage } from "./add-content/pages/generate-index"
import { generateLandingPageTemplate } from "./add-content/templates/LandingPage/generate-LandingPageTemplate"
import { generateTechnologies } from "./add-content/templates/LandingPage/generate-technologies"
import { generateReadme } from "./add-readme/generate-readme"

const gitAttributesFilename = ".gitattributes"

export const createNextStackPlugin = createPlugin({
  id: "create-next-stack",
  name: "Create Next Stack",
  description:
    "Adds various miscellaneous steps. Some necessities, some niceties.",
  active: true,
  steps: {
    addScripts: {
      id: "addScripts",
      description: "adding scripts to package.json",
      run: async (inputs) => {
        const scripts = filterPlugins(inputs).flatMap(
          (plugin) => plugin.scripts ?? []
        )

        // TODO: Add a scripts sort order here. Use TypeScript to force setting all plugin scripts.

        await modifyJsonFile("package.json", (packageJson) => ({
          ...packageJson,
          scripts: {
            ...toObject(packageJson["scripts"]),
            ...scripts.reduce(
              (acc, script) => ({
                ...acc,
                [script.name]: script.command,
              }),
              {}
            ),
          },
        }))
      },
    },
    copyAssets: {
      id: "copyAssets",
      description: "copying static assets",
      run: async (): Promise<void> => {
        const createNextStackDir = getCreateNextStackDir()
        const source = path.resolve(createNextStackDir, "prod-assets")
        const destination = path.resolve(".")
        await copyDirectory(source, destination)
      },
    },
    addContent: {
      id: "addContent",
      description: "adding content",
      run: async (inputs) => {
        await makeDirectory("components")
        await Promise.all([
          writeFile("pages/index.tsx", generateIndexPage(inputs)),
          writeFile("pages/_app.tsx", generateApp(inputs)),
          writeFile("pages/_document.tsx", generateDocument(inputs)),
          writeFile(
            "templates/LandingPage/technologies.ts",
            generateTechnologies(inputs)
          ),
          writeFile(
            "templates/LandingPage/LandingPageTemplate.tsx",
            generateLandingPageTemplate(inputs)
          ),
        ])
      },
    },
    addReadme: {
      id: "addReadme",
      description: "adding Readme",
      run: async (inputs) => {
        const readmeFileName = "README.md"
        await remove(readmeFileName)
        const readmeString = await generateReadme(inputs)
        await writeFile(readmeFileName, readmeString)
      },
    },
    initialCommit: {
      id: "initialCommit",
      description: "adding initial commit",
      shouldRun: async () => {
        if (!(await isGitInitialized())) {
          logWarning("Skipping initial commit, as Git was not initialized.")
          return false
        }
        return true
      },
      run: async () => {
        // Create Next App adds an initial commit. This is overridden using --amend below.
        await runCommand("git", ["add", "."])
        await runCommand("git", [
          "commit",
          "--amend",
          "-m",
          "Initial commit from Create Next Stack",
        ])
      },
    },
    installDependencies: {
      id: "installDependencies",
      description: "installing dependencies",
      run: async (inputs) => {
        const { flags } = inputs

        const depsAndTmpDeps = filterPlugins(inputs).flatMap((plugin) => {
          return [
            ...(plugin.dependencies != null
              ? Object.values(plugin.dependencies)
              : []),
            ...(plugin.tmpDependencies != null
              ? Object.values(plugin.tmpDependencies)
              : []),
          ]
        })

        const devDeps = filterPlugins(inputs).flatMap((plugin) => {
          return plugin.devDependencies != null
            ? Object.values(plugin.devDependencies)
            : []
        })

        if (depsAndTmpDeps.length > 0) {
          await install(depsAndTmpDeps, flags["package-manager"])
        }
        if (devDeps.length > 0) {
          await install(devDeps, flags["package-manager"], { dev: true })
        }
      },
    },
    uninstallTemporaryDependencies: {
      id: "uninstallTemporaryDependencies",
      description: "uninstalling temporary dependencies",
      run: async (inputs) => {
        const tmpDeps = filterPlugins(inputs).flatMap((plugin) => {
          return plugin.tmpDependencies != null
            ? Object.values(plugin.tmpDependencies)
            : []
        })

        if (tmpDeps.length > 0) {
          await uninstall(tmpDeps, inputs.flags["package-manager"])
        }
      },
    },
    formatProject: {
      id: "formatProject",
      description: "formatting project",
      run: async () => {
        await runCommand("npx", [
          getNameVersionCombo(prettierPlugin.devDependencies.prettier),
          "--write",
          ".",
        ])
      },
    },
    addGitAttributes: {
      id: "addGitAttributes",
      description: `adding ${gitAttributesFilename}`,
      shouldRun: async () => {
        if (!(await isGitInitialized())) {
          logWarning(
            `Skipping ${gitAttributesFilename} setup, as Git was not initialized.`
          )
          return false
        }
        return true
      },
      run: async () => {
        await writeFile(
          gitAttributesFilename,
          endent`
            # Normalize end of line. Read more about why in the links below:
            # https://prettier.io/docs/en/options.html#end-of-line
            # https://git-scm.com/docs/gitattributes#_effects
            * text=auto eol=lf
          `
        )
      },
    },
  },
} as const)

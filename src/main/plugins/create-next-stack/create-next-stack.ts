import fs from "fs/promises"
import path from "path"
import { constrain } from "../../helpers/constrain"
import { copyDirectory } from "../../helpers/copy-directory"
import { getCreateNextStackDir } from "../../helpers/get-create-next-stack-dir"
import { modifyJsonFile, toObject, writeFile } from "../../helpers/io"
import { isGitInitialized } from "../../helpers/is-git-initialized"
import { remove } from "../../helpers/remove"
import { logWarning } from "../../logging"
import { Plugin } from "../../plugin"
import { runCommand } from "../../run-command"
import { install, uninstall } from "../../setup/packages"
import { filterPlugins, plugins } from "../../setup/setup"
import { generatePage } from "./add-content/components/generate-page"
import { generateWithDefaultGlobalStyles } from "./add-content/components/generate-with-default-global-styles"
import { generateApp } from "./add-content/pages/generate-app"
import { generateDocument } from "./add-content/pages/generate-document"
import { generateIndexPage } from "./add-content/pages/generate-index"
import { generateTechnologies } from "./add-content/templates/LandingPage/generate-technologies"
import { generateReadme } from "./add-readme/generate-readme"

export const createNextStackPlugin = constrain<Plugin>()({
  name: "Create Next Stack",
  description:
    "Adds various miscellaneous steps. Some necessities, some niceties.",
  steps: {
    addScripts: {
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
      description: "copying static assets",
      run: async (): Promise<void> => {
        const createNextStackDir = getCreateNextStackDir()
        const source = path.resolve(`${createNextStackDir}/prod-assets`)
        const destination = path.resolve(".")
        await copyDirectory(source, destination)
      },
    },
    addContent: {
      description: "adding content",
      run: async (inputs) => {
        await fs.mkdir("components")

        const promises = [
          writeFile("components/Page.tsx", generatePage(inputs)),
          writeFile("pages/index.tsx", generateIndexPage(inputs)),
          writeFile("pages/_app.tsx", generateApp(inputs)),
          writeFile("pages/_document.tsx", generateDocument(inputs)),
          writeFile(
            "templates/LandingPage/technologies.ts",
            generateTechnologies(inputs)
          ),
        ]

        // TODO: Move to Emotion and Styled Components plugins.
        const { styling } = inputs.flags
        if (styling === "emotion" || styling === "styled-components") {
          promises.push(
            writeFile(
              "components/WithDefaultGlobalStyles.tsx",
              generateWithDefaultGlobalStyles(inputs)
            )
          )
        }

        await Promise.all(promises)
      },
    },
    addReadme: {
      description: "adding Readme",
      run: async (inputs) => {
        const readmeFileName = "README.md"
        await remove(readmeFileName)
        const readmeString = await generateReadme(inputs)
        await writeFile(readmeFileName, readmeString)
      },
    },
    initialCommit: {
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

        const devDeps = plugins.flatMap((plugin) => {
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
      description: "uninstalling temporary dependencies",
      run: async ({ flags }) => {
        const tmpDeps = plugins.flatMap((plugin) => {
          return plugin.tmpDependencies != null
            ? Object.values(plugin.tmpDependencies)
            : []
        })

        if (tmpDeps.length > 0) {
          await uninstall(tmpDeps, flags["package-manager"])
        }
      },
    },
  },
} as const)

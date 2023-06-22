import endent from "endent"
import path from "path"
import { copyDirectory } from "../../helpers/copy-directory"
import { getCreateNextStackDir } from "../../helpers/get-create-next-stack-dir"
import { modifyJsonFile, toObject, writeFile } from "../../helpers/io"
import { isGitInitialized } from "../../helpers/is-git-initialized"
import { nonNull } from "../../helpers/non-null"
import { runCommand } from "../../helpers/run-command"
import { logWarning } from "../../logging"
import { evalProperty, Plugin } from "../../plugin"
import { getNameVersionCombo, install, uninstall } from "../../setup/packages"
import { filterPlugins } from "../../setup/setup"
import { prettierPackage } from "../prettier"
import { generateEnv } from "./add-content/generate-env"
import { generateApp } from "./add-content/pages/generate-app"
import { generateDocument } from "./add-content/pages/generate-document"
import { generateIndexPage } from "./add-content/pages/generate-index"
import { generateLandingPageTemplate } from "./add-content/templates/LandingPage/generate-LandingPageTemplate"
import { generateTechnologies } from "./add-content/templates/LandingPage/generate-technologies"
import { generateNextConfig } from "./add-next-config/generate-next-config"
import { generateReadme } from "./add-readme/generate-readme"
import { getEnvironmentVariables } from "./sort-orders/environment-variables"
import { getScripts } from "./sort-orders/scripts"

const gitAttributesFilename = ".gitattributes"

export const createNextStackPlugin: Plugin = {
  id: "create-next-stack",
  name: "Create Next Stack",
  description:
    "Adds various miscellaneous steps. Some necessities, some niceties.",
  active: true,
  addFiles: [
    {
      destination: ".env",
      condition: (inputs) => getEnvironmentVariables(inputs).length > 0,
      content: (inputs) => generateEnv(inputs),
    },
    {
      destination: "next.config.js",
      content: (inputs) => generateNextConfig(inputs),
    },
    {
      destination: "pages/index.tsx",
      content: (inputs) => generateIndexPage(inputs),
    },
    {
      destination: "pages/_app.tsx",
      content: (inputs) => generateApp(inputs),
    },
    {
      destination: "pages/_document.tsx",
      content: (inputs) => generateDocument(inputs),
    },
    {
      destination: "templates/LandingPage/technologies.ts",
      content: (inputs) => generateTechnologies(inputs),
    },
    {
      destination: "templates/LandingPage/LandingPageTemplate.tsx",
      content: (inputs) => generateLandingPageTemplate(inputs),
    },
    {
      destination: "README.md",
      content: (inputs) => generateReadme(inputs),
    },
  ],
  steps: [
    {
      id: "addScripts",
      description: "adding scripts to package.json",
      run: async (inputs) => {
        const scripts = getScripts(inputs)

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
    {
      id: "copyAssets",
      description: "copying static assets",
      run: async (): Promise<void> => {
        const createNextStackDir = getCreateNextStackDir()
        const source = path.resolve(createNextStackDir, "prod-assets")
        const destination = path.resolve(".")
        await copyDirectory(source, destination)
      },
    },
    {
      id: "addContent",
      description: "adding content",
      run: async (inputs) => {
        const pluginFilesToWrite = filterPlugins(inputs)
          .flatMap((plugin) => plugin.addFiles)
          .filter(nonNull)

        await Promise.all(
          pluginFilesToWrite.map(async ({ destination, content }) =>
            writeFile(destination, await evalProperty(content, inputs))
          )
        )
      },
    },
    {
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
    {
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

        const devDeps = filterPlugins(inputs).flatMap((plugin) =>
          plugin.devDependencies != null
            ? Object.values(plugin.devDependencies)
            : []
        )

        if (depsAndTmpDeps.length > 0) {
          await install(depsAndTmpDeps, flags["package-manager"])
        }
        if (devDeps.length > 0) {
          await install(devDeps, flags["package-manager"], { dev: true })
        }
      },
    },
    {
      id: "uninstallTemporaryDependencies",
      description: "uninstalling temporary dependencies",
      run: async (inputs) => {
        const tmpDeps = filterPlugins(inputs).flatMap((plugin) =>
          plugin.tmpDependencies != null
            ? Object.values(plugin.tmpDependencies)
            : []
        )

        if (tmpDeps.length > 0) {
          await uninstall(tmpDeps, inputs.flags["package-manager"])
        }
      },
    },
    {
      id: "formatProject",
      description: "formatting project",
      run: async () => {
        await runCommand("npx", [
          getNameVersionCombo(prettierPackage),
          "--write",
          ".",
        ])
      },
    },
    {
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
  ],
} as const

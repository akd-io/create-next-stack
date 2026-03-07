import aldent from "aldent"
import path from "path"
import { copyDirectory } from "../../helpers/copy-directory.ts"
import { getCreateNextStackDir } from "../../helpers/get-create-next-stack-dir.ts"
import { modifyJsonFile, toObject, writeFile } from "../../helpers/io.ts"
import { isGitInitialized } from "../../helpers/is-git-initialized.ts"
import { nonNull } from "../../helpers/non-null.ts"
import { runCommand } from "../../helpers/run-command.ts"
import { logWarning } from "../../logging.ts"
import { evalOptionalProperty, evalProperty, Plugin } from "../../plugin.ts"
import {
  getNameVersionCombo,
  install,
  uninstall,
} from "../../setup/packages.ts"
import { filterPlugins } from "../../setup/setup.ts"
import { prettierPackage } from "../prettier.ts"
import { generateAppPage } from "./add-content/app/generate-page.ts"
import { generateLayout } from "./add-content/app/generate-layout.ts"
import {
  generateProviders,
  hasProviderSlots,
} from "./add-content/app/generate-providers.ts"
import { generateEnv } from "./add-content/generate-env.ts"
import { generateApp } from "./add-content/pages/generate-app.ts"
import { generateDocument } from "./add-content/pages/generate-document.ts"
import { generateIndexPage } from "./add-content/pages/generate-index.ts"
import { generateLandingPageTemplate } from "./add-content/templates/LandingPage/generate-LandingPageTemplate.ts"
import { generateTechnologies } from "./add-content/templates/LandingPage/generate-technologies.ts"
import { generateEslintConfig } from "./add-eslint-config/generate-eslint-config.ts"
import { generateNextConfig } from "./add-next-config/generate-next-config.ts"
import {
  generatePostcssConfig,
  hasPostcssConfig,
} from "./add-postcss-config/generate-postcss-config.ts"
import { generateReadme } from "./add-readme/generate-readme.ts"
import { getEnvironmentVariables } from "./sort-orders/environment-variables.ts"
import { getScripts } from "./sort-orders/scripts.ts"

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
      condition: async (inputs) =>
        (await getEnvironmentVariables(inputs)).length > 0,
      content: (inputs) => generateEnv(inputs),
    },
    {
      destination: "next.config.ts",
      content: (inputs) => generateNextConfig(inputs),
    },
    {
      destination: "postcss.config.mjs",
      condition: (inputs) => hasPostcssConfig(inputs),
      content: (inputs) => generatePostcssConfig(inputs),
    },
    {
      destination: "eslint.config.mjs",
      content: (inputs) => generateEslintConfig(inputs),
    },
    // Pages Router files
    {
      destination: "pages/index.tsx",
      condition: (inputs) => inputs.flags.router === "pages",
      content: (inputs) => generateIndexPage(inputs),
    },
    {
      destination: "pages/_app.tsx",
      condition: (inputs) => inputs.flags.router === "pages",
      content: (inputs) => generateApp(inputs),
    },
    {
      destination: "pages/_document.tsx",
      condition: (inputs) => inputs.flags.router === "pages",
      content: (inputs) => generateDocument(inputs),
    },
    // App Router files
    {
      destination: "app/layout.tsx",
      condition: (inputs) => inputs.flags.router === "app",
      content: (inputs) => generateLayout(inputs),
    },
    {
      destination: "app/providers.tsx",
      condition: async (inputs) =>
        inputs.flags.router === "app" && (await hasProviderSlots(inputs)),
      content: (inputs) => generateProviders(inputs),
    },
    {
      destination: "app/page.tsx",
      condition: (inputs) => inputs.flags.router === "app",
      content: () => generateAppPage(),
    },
    // Shared files
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
        const scripts = await getScripts(inputs)

        await modifyJsonFile("package.json", (packageJson) => ({
          ...packageJson,
          scripts: {
            ...toObject(packageJson["scripts"]),
            ...scripts.reduce(
              (acc, script) => ({
                ...acc,
                [script.name]: script.command,
              }),
              {},
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
        const pluginFilesToWrite = (await filterPlugins(inputs))
          .flatMap((plugin) => plugin.addFiles)
          .filter(nonNull)

        await Promise.all(
          pluginFilesToWrite.map(
            async ({ destination, content, condition }) => {
              const shouldWrite = await evalOptionalProperty(
                condition,
                inputs,
                true,
              )
              if (!shouldWrite) return
              await writeFile(destination, await evalProperty(content, inputs))
            },
          ),
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

        const depsAndTmpDeps = (await filterPlugins(inputs)).flatMap(
          (plugin) => {
            return [
              ...(plugin.dependencies != null
                ? Object.values(plugin.dependencies)
                : []),
              ...(plugin.tmpDependencies != null
                ? Object.values(plugin.tmpDependencies)
                : []),
            ]
          },
        )

        const devDeps = (await filterPlugins(inputs)).flatMap((plugin) =>
          plugin.devDependencies != null
            ? Object.values(plugin.devDependencies)
            : [],
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
        const tmpDeps = (await filterPlugins(inputs)).flatMap((plugin) =>
          plugin.tmpDependencies != null
            ? Object.values(plugin.tmpDependencies)
            : [],
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
            `Skipping ${gitAttributesFilename} setup, as Git was not initialized.`,
          )
          return false
        }
        return true
      },
      run: async () => {
        await writeFile(
          gitAttributesFilename,
          aldent`
            # Normalize end of line. Read more about why in the links below:
            # https://prettier.io/docs/en/options.html#end-of-line
            # https://git-scm.com/docs/gitattributes#_effects
            * text=auto eol=lf
          `,
        )
      },
    },
  ],
}

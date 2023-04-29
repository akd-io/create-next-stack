import chalk from "chalk"
import endent from "endent"
import path from "path"
import { makeDirectory, writeFile } from "../helpers/io"
import { remove } from "../helpers/remove"
import { runCommand } from "../helpers/run-command"
import { logDebug } from "../logging"
import { createPlugin, Package } from "../plugin"
import { getNameVersionCombo } from "../setup/packages"
import { generateNextConfig } from "./create-next-stack/add-next-config/generate-next-config"

const createNextAppPackage: Package = {
  name: "create-next-app",
  version: "13.2.3",
}

export const nextPlugin = createPlugin({
  name: "Next.js",
  description: "Adds Next.js foundation",
  active: true,
  technologies: [
    {
      name: "Next.js",
      description:
        "Next.js is the leading framework in the React ecosystem, featuring server-side rendering and static site generation among other rendering techniques. Utilizing its file-based routing architecture and its zero-config design principle, it is designed to enhance both the user and developer experience.",
      links: [
        { title: "Website", url: "https://nextjs.org/" },
        { title: "Docs", url: "https://nextjs.org/docs" },
        { title: "Learn Next.js", url: "https://nextjs.org/learn" },
        { title: "GitHub", url: "https://github.com/vercel/next.js" },
        { title: "Wikipedia", url: "https://en.wikipedia.org/wiki/Next.js" },
      ],
    },
  ],
  scripts: [
    {
      name: "dev",
      description: "Runs the Next.js development server.",
      command: "next dev",
    },
    {
      name: "build",
      description: "Generates a production build.",
      command: "next build",
    },
    {
      name: "start",
      description:
        "Runs the Next.js production server built using `build` script.",
      command: "next start",
    },
    {
      name: "lint",
      description:
        "Runs [ESLint](https://eslint.org/) to catch linting errors in the source code.",
      command: "next lint",
    },
  ],
  steps: {
    createNextApp: {
      description: "running Create Next App",

      run: async ({ args, flags }) => {
        // Make sure directory exists to avoid error from create-next-app
        await makeDirectory(args.appName)

        logDebug(endent`
          Directory created: ${args.appName}
    
          To open the project in vscode, run:
    
              ${chalk.cyan(`code ${path.resolve(args.appName)}`)}
        `)

        const createNextAppArgs = [
          args.appName,
          "--typescript",
          "--eslint",
          "--no-experimental-app",
          "--no-src-dir",
          "--import-alias=@/*",
        ]

        /* TODO: When create-next-app supports --use-yarn, use that instead of the below environment variable hack.
        switch (flags["package-manager"]) {
          case "pnpm":
            createNextAppArgs.push("--use-pnpm")
            break
          case "yarn":
            // create-next-app doesn't support --use-yarn, so we have to use the below environment variable hack.
            break
          case "npm":
            createNextAppArgs.push("--use-npm")
            break
        }
        */

        // Below, we temporarily modify the npm_config_user_agent environment variable to make create-next-app use the correct package manager to install dependencies.
        // This is done because create-next-app doesn't support --use-yarn.
        // Instead, users of create-next-app are supposed to use `yarn create next-app` to use create-next-app with Yarn.
        // This won't work for us though, as Yarn create doesn't support versioned package names, which we need to use to use the correct version of create-next-app.

        const oldNpmConfigUserAgent = process.env["npm_config_user_agent"]
        logDebug(
          "Initial npm_config_user_agent:",
          process.env["npm_config_user_agent"] ?? "undefined"
        )

        process.env[
          "npm_config_user_agent"
        ] = `${flags["package-manager"]}/? ${process.env["npm_config_user_agent"]}`
        logDebug(
          "Modified npm_config_user_agent:",
          process.env["npm_config_user_agent"]
        )

        await runCommand("npx", [
          getNameVersionCombo(createNextAppPackage),
          ...createNextAppArgs,
        ])

        // Reset npm_config_user_agent
        process.env["npm_config_user_agent"] = oldNpmConfigUserAgent

        logDebug("Changing directory to", args.appName)
        process.chdir(args.appName)
      },
    },
    removeOfficialCNAContent: {
      description: "removing content added by Create Next App",
      run: async () => {
        await Promise.all([
          remove("pages"),
          remove("styles"),
          remove("public/next.svg"),
          remove("public/thirteen.svg"),
          remove("public/vercel.svg"),
        ])
        await makeDirectory("pages")
      },
    },
    addNextConfig: {
      description: "adding next.config.js",
      run: async (inputs) => {
        const nextConfigFileName = "next.config.js"
        await remove(nextConfigFileName)
        const nextConfigString = await generateNextConfig(inputs)
        await writeFile(nextConfigFileName, nextConfigString)
      },
    },
  },
} as const)

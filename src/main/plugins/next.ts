import chalk from "chalk"
import endent from "endent"
import path from "path"
import { makeDirectory, writeFile } from "../helpers/io"
import { remove } from "../helpers/remove"
import { logDebug } from "../logging"
import { createPlugin, Package } from "../plugin"
import { runCommand } from "../run-command"
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
        switch (flags["package-manager"]) {
          case "pnpm":
            createNextAppArgs.push("--use-pnpm")
            break
          case "yarn":
            // default is yarn. And there's no flag for it.
            break
          case "npm":
            createNextAppArgs.push("--use-npm")
            break
        }

        await runCommand("npx", [
          getNameVersionCombo(createNextAppPackage),
          ...createNextAppArgs,
        ])

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

import chalk from "chalk"
import aldent from "aldent"
import path from "path"
import { makeDirectory } from "../helpers/io.ts"
import { remove } from "../helpers/remove.ts"
import { runCommand } from "../helpers/run-command.ts"
import { logDebug } from "../logging.ts"
import { Package, Plugin } from "../plugin.ts"
import { getNameVersionCombo } from "../setup/packages.ts"

const createNextAppPackage: Package = {
  name: "create-next-app",
  version: "16",
}

export const nextPlugin: Plugin = {
  id: "next",
  name: "Next.js",
  description: "Adds Next.js foundation",
  active: true,
  technologies: [
    {
      id: "next",
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
      command: "eslint",
    },
  ],
  steps: [
    {
      id: "createNextApp",
      description: "running Create Next App",

      run: async ({ args, flags }) => {
        // Make sure directory exists to avoid error from create-next-app
        await makeDirectory(args.app_name)

        logDebug(aldent`
          Directory created: ${args.app_name}

          To open the project in vscode, run:

              ${chalk.cyan(`code ${path.resolve(args.app_name)}`)}
        `)

        const createNextAppArgs = [
          args.app_name,
          "--typescript",
          "--eslint",
          "--no-tailwind",
          "--no-src-dir",
          "--import-alias=@/*",
          "--turbopack",
          "--yes",
          flags.router === "app" ? "--app" : "--no-app",
        ]

        switch (flags["package-manager"]) {
          case "pnpm":
            createNextAppArgs.push("--use-pnpm")
            break
          case "yarn":
            createNextAppArgs.push("--use-yarn")
            break
          case "npm":
            createNextAppArgs.push("--use-npm")
            break
        }

        await runCommand("npx", [
          getNameVersionCombo(createNextAppPackage),
          ...createNextAppArgs,
        ])

        logDebug("Changing directory to", args.app_name)
        process.chdir(args.app_name)
      },
    },
    {
      id: "removeOfficialCNAContent",
      description: "removing content added by Create Next App",
      run: async ({ flags }) => {
        const removals: string[] = [
          "README.md",
          "next.config.ts",
          "eslint.config.mjs",
          "pnpm-workspace.yaml",
          "public/file.svg",
          "public/globe.svg",
          "public/next.svg",
          "public/vercel.svg",
          "public/window.svg",
        ]

        if (flags.router === "app") {
          removals.push("app")
        } else {
          removals.push("pages", "styles")
        }

        await Promise.all(removals.map((file) => remove(file)))
      },
    },
  ],
}

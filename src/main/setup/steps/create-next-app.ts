import chalk from "chalk"
import endent from "endent"
import { promises as fs } from "fs"
import path from "path"
import { logDebug } from "../../logging"
import { runCommand } from "../../run-command"
import { getNameVersionCombo, packages } from "../packages"
import { Step } from "../step"

export const createNextAppStep: Step = {
  description: "creating Next.js app",

  shouldRun: async () => true,

  didRun: false,

  run: async ({ args, flags }) => {
    // Make sure directory exists to avoid error from create-next-app
    await fs.mkdir(args.appName, { recursive: true })

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
    if (flags["package-manager"] === "npm") {
      createNextAppArgs.push("--use-npm")
    }

    await runCommand("npx", [
      getNameVersionCombo(packages["create-next-app"]), // Note: npx ignores version ranges. So the tilde in packages["create-next-app"] is ignored and the exact version is used.
      ...createNextAppArgs,
    ])

    logDebug("Changing directory to", args.appName)
    process.chdir(args.appName)
  },
}

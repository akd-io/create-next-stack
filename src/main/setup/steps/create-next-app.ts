import chalk from "chalk"
import endent from "endent"
import { promises as fs } from "fs"
import path from "path"
import { constrain } from "../../helpers/constrain"
import { logDebug } from "../../logging"
import { Step } from "../../plugin"
import { nextPlugin } from "../../plugins/next"
import { runCommand } from "../../run-command"
import { getNameVersionCombo } from "../packages"

export const createNextAppStep = constrain<Step>()({
  description: "creating Next.js app",

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
      getNameVersionCombo(nextPlugin.extDependencies["create-next-app"]), // Note: npx ignores version ranges. So the tilde in packages["create-next-app"] is ignored and the exact version is used.
      ...createNextAppArgs,
    ])

    logDebug("Changing directory to", args.appName)
    process.chdir(args.appName)
  },
})

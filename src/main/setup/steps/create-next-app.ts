import { promises as fs } from "fs"
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

    const createNextAppArgs = [args.appName, "--typescript"]
    if (flags["package-manager"] === "npm") {
      createNextAppArgs.push("--use-npm")
    }

    await runCommand("npx", [
      getNameVersionCombo(packages["create-next-app"]), // Note: npx ignores version ranges. So the tilde in packages["create-next-app"] is ignored and the exact version is used.
      ...createNextAppArgs,
    ])

    process.chdir(args.appName)
  },
}

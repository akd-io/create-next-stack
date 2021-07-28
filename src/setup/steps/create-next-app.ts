import execa from "execa"
import { promises as fs } from "fs"
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

    await execa("npx", [
      getNameVersionCombo(packages["create-next-app"]),
      ...createNextAppArgs,
    ])

    process.chdir(args.appName)
  },
}

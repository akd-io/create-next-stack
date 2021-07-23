import execa from "execa"
import { promises as fs } from "fs"
import { exitWithError } from "../../helpers/exit-with-error"
import { commandInstance } from "../../instance"
import { getNameVersionCombo, packages } from "../packages"
import { Step } from "../step"

export const createNextAppStep: Step = {
  shouldRun: async () => true,

  run: async ({ args, flags }) => {
    const instance = commandInstance.get()
    instance.log("Creating Next.js app...")

    try {
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
    } catch (error) {
      exitWithError("An error occurred while creating Next.js app.", error)
    }

    process.chdir(args.appName)
  },
}

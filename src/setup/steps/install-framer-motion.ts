import { exitWithError } from "../../helpers/exit-with-error"
import { commandInstance } from "../../instance"
import { install, packages } from "../packages"
import { Step } from "../step"

export const installFramerMotionStep: Step = {
  shouldRun: async ({ flags }) => Boolean(flags["framer-motion"]),

  run: async ({ flags }) => {
    const instance = commandInstance.get()
    instance.log("Installing Framer Motion...")

    try {
      await install(packages["framer-motion"], flags["package-manager"])
    } catch (error) {
      exitWithError("An error occurred while installing Framer Motion.", error)
    }
  },
}

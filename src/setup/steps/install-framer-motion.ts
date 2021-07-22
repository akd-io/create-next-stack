import { exitWithError } from "../../helpers/exit-with-error"
import { commandInstance } from "../../instance"
import { packages, yarnAdd } from "../packages"
import { Step } from "../step"

export const installFramerMotionStep: Step = {
  shouldRun: async ({ flags }) => Boolean(flags["framer-motion"]),

  run: async () => {
    const instance = commandInstance.get()
    instance.log("Installing Framer Motion...")

    try {
      await yarnAdd(packages["framer-motion"])
    } catch (error) {
      exitWithError("An error occurred while installing Framer Motion.", error)
    }
  },
}

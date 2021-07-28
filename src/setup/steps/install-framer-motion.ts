import { install, packages } from "../packages"
import { Step } from "../step"

export const installFramerMotionStep: Step = {
  description: "installing Framer Motion",

  shouldRun: async ({ flags }) => Boolean(flags["framer-motion"]),

  didRun: false,

  run: async ({ flags }) => {
    await install(packages["framer-motion"], flags["package-manager"])
  },
}

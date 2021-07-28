import { install, packages } from "../packages"
import { Step } from "../step"

export const installReactHookFormStep: Step = {
  description: "installing React Hook Form",

  shouldRun: async (inputs) => Boolean(inputs.flags["react-hook-form"]),

  didRun: false,

  run: async ({ flags }) => {
    await install(packages["react-hook-form"], flags["package-manager"])
  },
}

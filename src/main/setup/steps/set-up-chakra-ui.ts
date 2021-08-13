import { install, packages } from "../packages"
import { Step } from "../step"

export const setUpChakraUIStep: Step = {
  description: "setting up Chakra UI",

  shouldRun: async ({ flags }) => Boolean(flags["chakra"]),

  didRun: false,

  run: async ({ flags }) => {
    await install(
      [packages["@chakra-ui/react"], packages["@chakra-ui/icons"]],
      flags["package-manager"]
    )
  },
}

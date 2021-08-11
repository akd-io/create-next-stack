import { Step } from "../step"

export const setUpChakraUIStep: Step = {
  description: "setting up Chakra UI",

  shouldRun: async ({ flags }) => Boolean(flags["chakra"]),

  didRun: false,

  run: async () => {
    // TODO: Set up Chakra UI
  },
}

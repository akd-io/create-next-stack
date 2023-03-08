import { constrain } from "../helpers/constrain"
import { Plugin } from "../plugin"

export const chakraUIPlugin = constrain<Plugin>()({
  name: "Chakra UI",
  description: "Adds support for Chakra UI",
  dependencies: {
    "@chakra-ui/icons": {
      name: "@chakra-ui/icons",
      version: "^2.0.0",
    },
    "@chakra-ui/react": {
      name: "@chakra-ui/react",
      version: "^2.0.0",
    },
  },
  technologies: [
    {
      name: "Chakra UI",
      description:
        "Chakra UI is a simple, modular, and accessible React component library that provides all the building blocks needed to build React user interfaces. It uses Emotion under the hood and includes components ranging from basic buttons and form input fields to tooltips and modals.",
      links: [
        { title: "Website", url: "https://chakra-ui.com/" },
        { title: "Docs", url: "https://chakra-ui.com/docs/getting-started" },
        { title: "GitHub", url: "https://github.com/chakra-ui/chakra-ui" },
      ],
    },
  ],
} as const)

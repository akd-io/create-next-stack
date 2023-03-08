import { constrain } from "../helpers/constrain"
import { Plugin } from "../plugin"

export const styledComponentsPlugin = constrain<Plugin>()({
  name: "Styled Components",
  description: "Adds support for Styled Components",
  stylingMethodArg: "styled-components",
  dependencies: {
    "styled-components": { name: "styled-components", version: "^5.0.0" },
  },
  devDependencies: {
    "@types/styled-components": {
      name: "@types/styled-components",
      version: "^5.0.0",
    },
  },
  technologies: [
    {
      name: "Styled Components",
      description:
        "Styled Components is a React CSS-in-JS library designed for writing css styles inside JavaScript and TypeScript files. It provides powerful and predictable style composition in addition to a great developer experience. Developers can style their components using both string and object notation.",
      links: [
        { title: "Website", url: "https://styled-components.com/" },
        { title: "Docs", url: "https://styled-components.com/docs" },
        {
          title: "GitHub",
          url: "https://github.com/styled-components/styled-components",
        },
      ],
    },
  ],
} as const)

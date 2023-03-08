import { constrain } from "../../helpers/constrain"
import { writeFile } from "../../helpers/io"
import { Plugin } from "../../plugin"
import { materialTheme } from "./setup/material-theme"

export const materialUIPlugin = constrain<Plugin>()({
  name: "Material UI",
  description: "Adds support for Material UI",
  dependencies: {
    "@mui/material": {
      name: "@mui/material",
      version: "^5.0.0",
    },
  },
  technologies: [
    {
      name: "Material UI",
      description:
        "Material UI is a React UI component library that implements Google's material design guidelines. It features pre-built with components ranging from basic buttons and form input fields to tooltips and modals.",
      links: [
        { title: "Website", url: "https://material-ui.com/" },
        {
          title: "Docs",
          url: "https://material-ui.com/getting-started/installation/",
        },
        { title: "GitHub", url: "https://github.com/mui-org/material-ui" },
      ],
    },
  ],
  steps: {
    setup: {
      description: "setting up Material UI",
      shouldRun: async (inputs) => Boolean(inputs.flags["material-ui"]),
      run: async () => {
        await writeFile("material-theme.ts", materialTheme)
      },
    },
  },
} as const)

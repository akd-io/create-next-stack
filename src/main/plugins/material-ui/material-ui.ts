import { writeFile } from "../../helpers/io"
import { createPlugin } from "../../plugin"
import { materialTheme } from "./setup/material-theme"

export const materialUIPlugin = createPlugin({
  name: "Material UI",
  description: "Adds support for Material UI",
  active: ({ flags }) => Boolean(flags["material-ui"]),
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
      run: async () => {
        await writeFile("material-theme.ts", materialTheme)
      },
    },
  },
  slots: {
    document: {
      imports: [`import materialTheme, { roboto } from "../material-theme";`],
      htmlAttributes: [`className={roboto.className}`],
      headTags: [
        `<meta name="theme-color" content={materialTheme.palette.primary.main} />`,
      ],
    },
  },
} as const)

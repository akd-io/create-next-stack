import aldent from "aldent"
import type { Plugin } from "../plugin.ts"

const materialTheme = aldent`
  "use client";
  import { Roboto } from "next/font/google";
  import { createTheme } from "@mui/material/styles";
  import { red } from "@mui/material/colors";

  export const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-roboto",
  });

  export default createTheme({
    cssVariables: true,
    palette: {
      primary: {
        main: "#556cd6",
      },
      secondary: {
        main: "#19857b",
      },
      error: {
        main: red.A400,
      },
    },
    typography: {
      fontFamily: "var(--font-roboto)",
    },
  });
`

export const materialUIPlugin: Plugin = {
  id: "material-ui",
  name: "Material UI",
  description: "Adds support for Material UI",
  active: ({ flags }) => Boolean(flags["material-ui"]),
  dependencies: [
    { name: "@mui/material", version: "^7.0.0" },
    { name: "@mui/material-nextjs", version: "^7.0.0" },
    { name: "@emotion/cache", version: "^11.0.0" },
  ],
  technologies: [
    {
      id: "materialUI",
      name: "Material UI",
      description:
        "Material UI is a React UI component library that implements Google's material design guidelines. It features pre-built with components ranging from basic buttons and form input fields to tooltips and modals.",
      links: [
        { title: "Website", url: "https://mui.com/material-ui/" },
        {
          title: "Docs",
          url: "https://mui.com/material-ui/getting-started/",
        },
        { title: "GitHub", url: "https://github.com/mui/material-ui" },
      ],
    },
  ],
  slots: {
    pagesApp: {
      imports: aldent`
        import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
        import CssBaseline from "@mui/material/CssBaseline";
        import materialTheme from "../material-theme";
      `,
      componentsStart: aldent`
        <MuiThemeProvider theme={materialTheme}>
          <CssBaseline />
      `,
      componentsEnd: `</MuiThemeProvider>`,
    },
    pagesDocument: {
      imports: `import { roboto } from "../material-theme";`,
      htmlAttributes: `className={roboto.variable}`,
      headTags: `<meta name="theme-color" content="#556cd6" />`,
    },
    appLayout: {
      imports: aldent`
        import { roboto } from "../material-theme";
      `,
      htmlAttributes: `className={roboto.variable}`,
      headContent: `<meta name="theme-color" content="#556cd6" />`,
      providerImports: aldent`
        import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
        import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
        import CssBaseline from "@mui/material/CssBaseline";
        import materialTheme from "../material-theme";
      `,
      providersStart: aldent`
        <AppRouterCacheProvider>
          <MuiThemeProvider theme={materialTheme}>
            <CssBaseline />
      `,
      providersEnd: aldent`
          </MuiThemeProvider>
        </AppRouterCacheProvider>
      `,
    },
  },
  addFiles: [
    {
      destination: "material-theme.ts",
      content: materialTheme,
    },
  ],
}

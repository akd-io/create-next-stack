import endent from "endent"
import { Plugin } from "../../plugin"

const materialTheme = endent`
  import { Roboto } from 'next/font/google';
  import { createTheme } from '@mui/material/styles';
  import { red } from '@mui/material/colors';

  export const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    fallback: ['Helvetica', 'Arial', 'sans-serif'],
  });

  // Create a theme instance.
  export default createTheme({
    palette: {
      primary: {
        main: '#556cd6',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: red.A400,
      },
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
  });
`

export const materialUIPlugin: Plugin = {
  id: "material-ui",
  name: "Material UI",
  description: "Adds support for Material UI",
  active: ({ flags }) => Boolean(flags["material-ui"]),
  dependencies: [{ name: "@mui/material", version: "^5.0.0" }],
  technologies: [
    {
      id: "materialUI",
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
  slots: {
    app: {
      imports: endent`
        import { ThemeProvider } from "@mui/material/styles";
        import CssBaseline from '@mui/material/CssBaseline';
        import materialTheme from "../material-theme";
      `,
      componentsStart: endent`
        <ThemeProvider theme={materialTheme}>
          <CssBaseline />
      `,
      componentsEnd: `</ThemeProvider>`,
    },
    document: {
      imports: `import materialTheme, { roboto } from "../material-theme";`,
      htmlAttributes: `className={roboto.className}`,
      headTags: `<meta name="theme-color" content={materialTheme.palette.primary.main} />`,
    },
  },
  addFiles: [
    {
      destination: "material-theme.ts",
      content: materialTheme,
    },
  ],
} as const

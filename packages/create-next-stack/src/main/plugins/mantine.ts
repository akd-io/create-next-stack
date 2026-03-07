import aldent from "aldent"
import { Plugin } from "../plugin.ts"

export const mantinePlugin: Plugin = {
  id: "mantine",
  name: "Mantine",
  description: "Adds support for Mantine",
  active: ({ flags }) => Boolean(flags.mantine),
  dependencies: [
    { name: "@mantine/core", version: "^8.0.0" },
    { name: "@mantine/hooks", version: "^8.0.0" },
  ],
  devDependencies: [
    { name: "postcss", version: "^8.0.0" },
    { name: "postcss-preset-mantine", version: "^1.0.0" },
    { name: "postcss-simple-vars", version: "^7.0.0" },
  ],
  technologies: [
    {
      id: "mantine",
      name: "Mantine",
      description:
        "Mantine is a fully featured React component library. Aside from the core package, Mantine also provides additional packages for utility hooks, form state management, date inputs and calendars, notifications, code highlighting, right text editor, and the list goes on.",
      links: [
        { title: "Website", url: "https://mantine.dev/" },
        { title: "Docs", url: "https://mantine.dev/getting-started/" },
        { title: "GitHub", url: "https://github.com/mantinedev/mantine" },
      ],
    },
  ],
  slots: {
    pagesApp: {
      imports: aldent`
        import { MantineProvider } from "@mantine/core";
        import "@mantine/core/styles.css";
      `,
      componentsStart: aldent`
        <MantineProvider>
      `,
      componentsEnd: aldent`
        </MantineProvider>
      `,
    },
    pagesDocument: {
      imports: aldent`
        import { ColorSchemeScript } from "@mantine/core";
      `,
      headTags: aldent`
        <ColorSchemeScript />
      `,
    },
    appLayout: {
      imports: aldent`
        import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
        import "@mantine/core/styles.css";
      `,
      htmlAttributes: `{...mantineHtmlProps}`,
      headContent: aldent`
        <ColorSchemeScript />
      `,
      providerImports: aldent`
        import { MantineProvider } from "@mantine/core";
      `,
      providersStart: aldent`
        <MantineProvider>
      `,
      providersEnd: aldent`
        </MantineProvider>
      `,
    },
    postcssConfig: {
      plugins: {
        "postcss-preset-mantine": "{}",
        "postcss-simple-vars": `{
      variables: {
        "mantine-breakpoint-xs": "36em",
        "mantine-breakpoint-sm": "48em",
        "mantine-breakpoint-md": "62em",
        "mantine-breakpoint-lg": "75em",
        "mantine-breakpoint-xl": "88em",
      },
    }`,
      },
    },
  },
}

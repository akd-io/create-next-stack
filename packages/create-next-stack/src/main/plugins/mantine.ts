import endent from "endent"
import { Plugin } from "../plugin"

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
      imports: endent`
        import { MantineProvider } from "@mantine/core";
        import "@mantine/core/styles.css";
      `,
      componentsStart: endent`
        <MantineProvider>
      `,
      componentsEnd: endent`
        </MantineProvider>
      `,
    },
    pagesDocument: {
      imports: endent`
        import { ColorSchemeScript } from "@mantine/core";
      `,
      headTags: endent`
        <ColorSchemeScript />
      `,
    },
    appLayout: {
      imports: endent`
        import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
        import "@mantine/core/styles.css";
      `,
      htmlAttributes: `{...mantineHtmlProps}`,
      headContent: endent`
        <ColorSchemeScript />
      `,
      providerImports: endent`
        import { MantineProvider } from "@mantine/core";
      `,
      providersStart: endent`
        <MantineProvider>
      `,
      providersEnd: endent`
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

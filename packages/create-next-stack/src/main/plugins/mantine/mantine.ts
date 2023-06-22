import endent from "endent"
import { Plugin } from "../../plugin"

export const mantinePlugin: Plugin = {
  id: "mantine",
  name: "Mantine",
  description: "Adds support for Mantine",
  active: ({ flags }) => Boolean(flags.mantine),
  dependencies: [
    { name: "@mantine/core", version: "^6.0.0" },
    { name: "@mantine/hooks", version: "^6.0.0" },
    { name: "@mantine/next", version: "^6.0.0" },
    { name: "@emotion/server", version: "^11.0.0" },
  ],
  technologies: [
    {
      id: "mantine",
      name: "Mantine",
      description:
        "Mantine is a fully featured React component library. Aside from the core package, Mantine also provides additional packages for utility hooks, form state management, date inputs and calendars, notifications, code highlighting, right text editor, and the list goes on.",
      links: [
        { title: "Website", url: "https://mantine.dev/" },
        { title: "Docs", url: "https://mantine.dev/pages/getting-started/" },
        { title: "GitHub", url: "https://github.com/mantinedev/mantine" },
      ],
    },
  ],
  slots: {
    app: {
      imports: endent`
        import { MantineProvider } from '@mantine/core';
        import { mantineTheme } from "../mantine-theme";
      `,
      componentsStart: endent`
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={mantineTheme}
        >
      `,
      componentsEnd: endent`
        </MantineProvider>
      `,
    },
    document: {
      imports: endent`
        import { createGetInitialProps } from '@mantine/next';
      `,
      afterImports: endent`
        const getInitialProps = createGetInitialProps();
      `,
      classMembers: endent`
        static getInitialProps = getInitialProps;
      `,
    },
  },
  addFiles: [
    {
      destination: "mantine-theme.ts",
      content: endent`
        import { MantineThemeOverride } from "@mantine/core";
      
        export const mantineTheme: MantineThemeOverride = {
          colorScheme: "light",
        };
      `,
    },
  ],
} as const

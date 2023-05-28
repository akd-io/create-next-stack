import endent from "endent"
import { writeFile } from "../../helpers/io"
import { createPlugin } from "../../plugin"
import { mantineTheme } from "./setup/mantine-theme"

export const mantinePlugin = createPlugin({
  id: "mantine",
  name: "Mantine",
  description: "Adds support for Mantine",
  active: ({ flags }) => Boolean(flags.mantine),
  dependencies: {
    "@mantine/core": {
      name: "@mantine/core",
      version: "^6.0.0",
    },
    "@mantine/hooks": {
      name: "@mantine/hooks",
      version: "^6.0.0",
    },
    "@mantine/next": {
      name: "@mantine/next",
      version: "^6.0.0",
    },
    "@emotion/server": {
      name: "@emotion/server",
      version: "^11.0.0",
    },
  },
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
  steps: {
    setUpMantine: {
      id: "setUpMantine",
      description: "setting up Mantine",
      run: async () => {
        await writeFile("mantine-theme.ts", mantineTheme)
      },
    },
  },
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
} as const)

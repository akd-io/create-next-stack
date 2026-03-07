import endent from "endent"
import { Plugin } from "../plugin"

export const chakraUIPlugin: Plugin = {
  id: "chakra-ui",
  name: "Chakra UI",
  description: "Adds support for Chakra UI",
  active: ({ flags }) => Boolean(flags.chakra),
  dependencies: [
    { name: "@chakra-ui/react", version: "^2.0.0" },
    { name: "@chakra-ui/icons", version: "^2.0.0" },
  ],
  technologies: [
    {
      id: "chakraUI",
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
  slots: {
    app: {
      imports: endent`
        import { ChakraProvider } from "@chakra-ui/react";
        import { chakraTheme } from "../chakra-theme";
      `,
      componentsStart: endent`
        <ChakraProvider theme={chakraTheme}>
      `,
      componentsEnd: endent`
        </ChakraProvider>
      `,
    },
    document: {
      imports: endent`
        import { ColorModeScript } from "@chakra-ui/react";
        import { chakraTheme } from "../chakra-theme";
      `,
      body: `<ColorModeScript initialColorMode={chakraTheme.config.initialColorMode} />`,
    },
  },
  addFiles: [
    {
      destination: "chakra-theme.ts",
      content: endent`
        import { extendTheme, ThemeConfig } from "@chakra-ui/react";
      
        const config: ThemeConfig = {
          initialColorMode: "light",
          useSystemColorMode: false,
        };
      
        export const chakraTheme = extendTheme({ config });
      `,
    },
  ],
}

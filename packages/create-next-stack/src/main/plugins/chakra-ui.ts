import aldent from "aldent"
import type { Plugin } from "../plugin.ts"

export const chakraUIPlugin: Plugin = {
  id: "chakra-ui",
  name: "Chakra UI",
  description: "Adds support for Chakra UI",
  active: ({ flags }) => Boolean(flags.chakra),
  dependencies: [
    { name: "@chakra-ui/react", version: "^3.0.0" },
    { name: "next-themes", version: "^0.4.0" },
  ],
  technologies: [
    {
      id: "chakraUI",
      name: "Chakra UI",
      description:
        "Chakra UI is a simple, modular, and accessible React component library that provides all the building blocks needed to build React user interfaces.",
      links: [
        { title: "Website", url: "https://chakra-ui.com/" },
        { title: "Docs", url: "https://chakra-ui.com/docs/get-started" },
        { title: "GitHub", url: "https://github.com/chakra-ui/chakra-ui" },
      ],
    },
  ],
  slots: {
    nextConfig: {
      nextConfig: {
        experimental: {
          optimizePackageImports: ["@chakra-ui/react"],
        },
      },
    },
    pagesApp: {
      imports: aldent`
        import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
        import { ThemeProvider } from "next-themes";
      `,
      componentsStart: aldent`
        <ChakraProvider value={defaultSystem}>
          <ThemeProvider attribute="class" disableTransitionOnChange>
      `,
      componentsEnd: aldent`
          </ThemeProvider>
        </ChakraProvider>
      `,
    },
    appLayout: {
      providerImports: aldent`
        import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
        import { ThemeProvider } from "next-themes";
      `,
      providersStart: aldent`
        <ChakraProvider value={defaultSystem}>
          <ThemeProvider attribute="class" disableTransitionOnChange>
      `,
      providersEnd: aldent`
          </ThemeProvider>
        </ChakraProvider>
      `,
    },
  },
}

import aldent from "aldent"
import type { Plugin } from "../plugin.ts"

export const styledComponentsPlugin: Plugin = {
  id: "styled-components",
  name: "Styled Components",
  description: "Adds support for Styled Components",
  active: ({ flags }) => Boolean(flags.styling === "styled-components"),
  dependencies: [{ name: "styled-components", version: "^6.0.0" }],
  technologies: [
    {
      id: "styledComponents",
      name: "Styled Components",
      description:
        "Styled Components is a React CSS-in-JS library designed for writing css styles inside JavaScript and TypeScript files. It provides powerful and predictable style composition in addition to a great developer experience. Developers can style their components using both string and object notation.",
      links: [
        { title: "Website", url: "https://styled-components.com/" },
        { title: "Docs", url: "https://styled-components.com/docs" },
        {
          title: "GitHub",
          url: "https://github.com/styled-components/styled-components",
        },
      ],
    },
  ],
  slots: {
    nextConfig: {
      nextConfig: {
        compiler: {
          styledComponents: true,
        },
      },
    },
    appLayout: {
      providerImports: aldent`
        import React from "react";
        import { useServerInsertedHTML } from "next/navigation";
        import { ServerStyleSheet, StyleSheetManager } from "styled-components";
      `,
      providerAfterImports: aldent`
        function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
          const [styledComponentsStyleSheet] = React.useState(() => new ServerStyleSheet());

          useServerInsertedHTML(() => {
            const styles = styledComponentsStyleSheet.getStyleElement();
            styledComponentsStyleSheet.instance.clearTag();
            return <>{styles}</>;
          });

          if (typeof window !== "undefined") return <>{children}</>;

          return (
            <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
              {children}
            </StyleSheetManager>
          );
        }
      `,
      providersStart: `<StyledComponentsRegistry>`,
      providersEnd: `</StyledComponentsRegistry>`,
    },
  },
  todos: [
    "Note: Styled Components styles only apply in Client Components. Add the `'use client'` directive to components that use CSS-in-JS styling.",
  ],
}

import aldent from "aldent"
import { modifyJsonFile, toObject } from "../helpers/io.ts"
import type { Plugin } from "../plugin.ts"

export const emotionPlugin: Plugin = {
  id: "emotion",
  name: "Emotion",
  description: "Adds support for Emotion",
  active: ({ flags }) => flags.styling === "emotion",
  dependencies: [
    { name: "@emotion/react", version: "^11.0.0" },
    { name: "@emotion/styled", version: "^11.0.0" },
    { name: "@emotion/cache", version: "^11.0.0" },
  ],
  technologies: [
    {
      id: "emotion",
      name: "Emotion",
      description:
        "Emotion is a React CSS-in-JS library designed for writing css styles inside JavaScript and TypeScript files. It provides powerful and predictable style composition in addition to a great developer experience. Developers can style their components using both string and object notation.",
      links: [
        { title: "Website", url: "https://emotion.sh/" },
        { title: "Docs", url: "https://emotion.sh/docs/introduction" },
        { title: "GitHub", url: "https://github.com/emotion-js/emotion" },
      ],
    },
  ],
  steps: [
    {
      id: "setUpEmotion",
      description: "setting up Emotion",
      shouldRun: async ({ flags }) => flags.router === "pages",
      run: async () => {
        await modifyJsonFile("tsconfig.json", (tsConfig) => ({
          ...tsConfig,
          compilerOptions: {
            ...toObject(tsConfig["compilerOptions"]),
            jsxImportSource: "@emotion/react",
          },
        }))
      },
    },
  ],
  slots: {
    nextConfig: {
      nextConfig: {
        compiler: {
          emotion: true,
        },
      },
    },
    appLayout: {
      providerImports: aldent`
        import React from "react";
        import { useServerInsertedHTML } from "next/navigation";
        import createCache from "@emotion/cache";
        import { CacheProvider } from "@emotion/react";
      `,
      providerLogic: aldent`
        const [cache] = React.useState(() => {
          const cache = createCache({ key: "css" });
          cache.compat = true;
          return cache;
        });

        useServerInsertedHTML(() => {
          const entries = cache.inserted;
          if (Object.keys(entries).length === 0) return null;
          let styles = "";
          const names: string[] = [];
          for (const [name, value] of Object.entries(entries)) {
            if (typeof value === "string") {
              names.push(name);
              styles += value;
            }
          }
          if (names.length === 0) return null;
          return <style data-emotion={\`\${cache.key} \${names.join(" ")}\`} dangerouslySetInnerHTML={{ __html: styles }} />;
        });
      `,
      providersStart: aldent`
        <CacheProvider value={cache}>
      `,
      providersEnd: aldent`
        </CacheProvider>
      `,
    },
  },
  todos: [
    "Note: Emotion styles only apply in Client Components. Add `'use client'` to components that use CSS-in-JS styling.",
  ],
}

import endent from "endent"
import { modifyJsonFile, toObject } from "../helpers/io"
import { Plugin } from "../plugin"

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
      providerImports: endent`
        import React from "react";
        import { useServerInsertedHTML } from "next/navigation";
        import createCache from "@emotion/cache";
        import { CacheProvider } from "@emotion/react";
      `,
      providerLogic: endent`
        const [cache] = React.useState(() => {
          const cache = createCache({ key: "css" });
          cache.compat = true;
          return cache;
        });

        useServerInsertedHTML(() => {
          const entries = (cache as any).inserted;
          if (Object.keys(entries).length === 0) return null;
          const names = Object.keys(entries);
          let styles = "";
          for (const name of names) {
            styles += entries[name];
          }
          return <style data-emotion={\`\${cache.key} \${names.join(" ")}\`} dangerouslySetInnerHTML={{ __html: styles }} />;
        });
      `,
      providersStart: endent`
        <CacheProvider value={cache}>
      `,
      providersEnd: endent`
        </CacheProvider>
      `,
    },
  },
  todos: [
    "Note: Emotion styles only apply in Client Components. Add the `'use client'` directive to components that use CSS-in-JS styling.",
  ],
}

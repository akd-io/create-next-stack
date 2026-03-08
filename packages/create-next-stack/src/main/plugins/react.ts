import type { Plugin } from "../plugin.ts"

export const reactPlugin: Plugin = {
  id: "react",
  name: "React",
  description: "Adds relevant React documentation",
  active: true,
  devDependencies: [
    // Explicitly set to prevent pnpm's auto-install-peers from corrupting
    // the version when packages like @emotion/react list @types/react as
    // an optional peer dep without a version constraint.
    { name: "@types/react", version: "^19" },
    { name: "@types/react-dom", version: "^19" },
  ],
  technologies: [
    {
      id: "react",
      name: "React",
      description:
        "React is a JavaScript library for building declarative and flexible user interfaces in a functional paradigm. Being the most popular front-end library in the world, it enables developers to create reusable UI components that can be composed to build complex web applications.",
      links: [
        { title: "Website", url: "https://reactjs.org/" },
        { title: "Docs", url: "https://reactjs.org/docs/getting-started.html" },
        { title: "GitHub", url: "https://github.com/facebook/react" },
        {
          title: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/React_(JavaScript_library)",
        },
      ],
    },
  ],
}

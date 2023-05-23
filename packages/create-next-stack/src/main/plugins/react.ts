import { createPlugin } from "../plugin"

export const reactPlugin = createPlugin({
  id: "react",
  name: "React",
  description: "Adds relevant React documentation",
  active: true,
  technologies: [
    {
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
} as const)

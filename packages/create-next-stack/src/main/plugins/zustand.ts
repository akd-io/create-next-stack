import type { Plugin } from "../plugin.ts"

export const zustandPlugin: Plugin = {
  id: "zustand",
  name: "Zustand",
  description: "Adds support for Zustand",
  active: ({ flags }) => Boolean(flags.zustand),
  dependencies: [{ name: "zustand", version: "^5.0.0" }],
  technologies: [
    {
      id: "zustand",
      name: "Zustand",
      description:
        "Zustand is a small, fast and scalable state-management solution with a comfortable API based on hooks. It is unopinionated and avoids the boilerplate of traditional state management libraries like Redux, while still providing a great developer experience.",
      links: [
        { title: "Website", url: "https://zustand.docs.pmnd.rs/" },
        {
          title: "Docs",
          url: "https://zustand.docs.pmnd.rs/getting-started/introduction",
        },
        { title: "GitHub", url: "https://github.com/pmndrs/zustand" },
      ],
    },
  ],
}

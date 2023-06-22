import { Plugin } from "../plugin"

export const framerMotionPlugin: Plugin = {
  id: "framer-motion",
  name: "Framer Motion",
  description: "Adds support for Framer Motion",
  active: ({ flags }) => Boolean(flags["framer-motion"]),
  dependencies: [{ name: "framer-motion", version: "^9.0.0" }],
  technologies: [
    {
      id: "framerMotion",
      name: "Framer Motion",
      description:
        "Framer Motion is a popular React animation library. It allows users to create both simple animations and complex gesture-based interactions. The library implements a declarative API, otherwise known as spring animations, which lets the developer define the animation's end state, letting the library handle the rest.",
      links: [
        { title: "Website", url: "https://www.framer.com/motion/" },
        { title: "Docs", url: "https://www.framer.com/docs/" },
        { title: "GitHub", url: "https://github.com/framer/motion" },
      ],
    },
  ],
} as const

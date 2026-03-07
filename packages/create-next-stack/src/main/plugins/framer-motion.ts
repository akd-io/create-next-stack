import { Plugin } from "../plugin.ts"

export const framerMotionPlugin: Plugin = {
  id: "framer-motion",
  name: "Framer Motion",
  description: "Adds support for Framer Motion",
  active: ({ flags }) => Boolean(flags["framer-motion"]),
  dependencies: [{ name: "motion", version: "^12.0.0" }],
  technologies: [
    {
      id: "framerMotion",
      name: "Motion",
      description:
        "Motion (formerly Framer Motion) is a popular React animation library. It allows users to create both simple animations and complex gesture-based interactions. The library implements a declarative API, otherwise known as spring animations, which lets the developer define the animation's end state, letting the library handle the rest.",
      links: [
        { title: "Website", url: "https://motion.dev/" },
        { title: "Docs", url: "https://motion.dev/docs" },
        { title: "GitHub", url: "https://github.com/motiondivision/motion" },
      ],
    },
  ],
}

import aldent from "aldent"
import { Plugin } from "../plugin.ts"

export const tailwindCSSPlugin: Plugin = {
  id: "tailwind-css",
  name: "Tailwind CSS",
  description: "Adds support for Tailwind CSS",
  active: ({ flags }) => flags["styling"] === "tailwind-css",
  dependencies: [{ name: "tailwindcss", version: "^4.0.0" }],
  devDependencies: [
    { name: "@tailwindcss/postcss", version: "^4.0.0" },
    { name: "postcss", version: "^8.0.0" },
  ],
  technologies: [
    {
      id: "tailwindCSS",
      name: "Tailwind CSS",
      description:
        "Tailwind CSS is a utility-first CSS framework for rapidly building custom designs. Its utilities come as helper classes that function as shorthands for the most common CSS patterns that developers use all the time.",
      links: [
        { title: "Website", url: "https://tailwindcss.com/" },
        { title: "Docs", url: "https://tailwindcss.com/docs" },
        { title: "GitHub", url: "https://github.com/tailwindlabs/tailwindcss" },
      ],
    },
  ],
  slots: {
    pagesApp: {
      imports: `import "../styles/globals.css";`,
    },
    appLayout: {
      imports: `import "../styles/globals.css";`,
    },
    postcssConfig: {
      plugins: { "@tailwindcss/postcss": "{}" },
    },
  },
  addFiles: [
    {
      destination: "styles/globals.css",
      content: aldent`
        @import "tailwindcss";
      `,
    },
  ],
}

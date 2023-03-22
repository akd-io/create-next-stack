import fs from "fs/promises"
import { writeFile } from "../../helpers/io"
import { createPlugin } from "../../plugin"
import { cssModulesPlugin } from "../css-modules/css-modules"
import { generateGlobalStyles } from "./add-content/styles/global-styles"

export const sassPlugin = createPlugin({
  name: "Sass",
  description: "Adds support for Sass",
  active: ({ flags }) => flags.styling === "css-modules-with-sass",
  dependencies: { sass: { name: "sass", version: "^1.0.0" } },
  technologies: [
    cssModulesPlugin.technologies[0],
    {
      name: "Sass",
      description:
        "Sass is a stylesheet language that is compiled to CSS. It is an extension of CSS that adds extra powers to the basic language. It allows developers to use variables, nested rules, mixins, inline imports, and more.",
      links: [
        { title: "Website", url: "https://sass-lang.com/" },
        { title: "Docs", url: "https://sass-lang.com/documentation" },
        {
          title: "Next.js-specific docs",
          url: "https://nextjs.org/docs/basic-features/built-in-css-support#sass-support",
        },
      ],
    },
  ],
  steps: {
    setup: {
      description: "setting up Sass",
      run: async () => {
        await fs.mkdir("styles")
        await writeFile("styles/global-styles.scss", generateGlobalStyles())
      },
    },
  },
} as const)

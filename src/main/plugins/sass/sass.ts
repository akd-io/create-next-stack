import fs from "fs/promises"
import { constrain } from "../../helpers/constrain"
import { writeFile } from "../../helpers/io"
import { Plugin } from "../../plugin"
import { generateGlobalStyles } from "./add-content/styles/global-styles"

export const sassPlugin = constrain<Plugin>()({
  name: "Sass",
  description: "Adds support for Sass",
  dependencies: { sass: { name: "sass", version: "^1.0.0" } },
  technologies: [
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
      shouldRun: async ({ flags }) =>
        Boolean(flags.styling === "css-modules-with-sass"),
      run: async () => {
        await fs.mkdir("styles")
        await writeFile("styles/global-styles.scss", generateGlobalStyles())
      },
    },
  },
} as const)

import { writeFile } from "../../helpers/io"
import { createPlugin } from "../../plugin"
import { cssModulesPlugin } from "../css-modules/css-modules"
import { generateGlobalStyles } from "./add-content/styles/global-styles"

export const sassPlugin = createPlugin({
  id: "sass",
  name: "Sass",
  description: "Adds support for Sass",
  active: ({ flags }) => flags.styling === "css-modules-with-sass",
  dependencies: [{ name: "sass", version: "^1.0.0" }],
  technologies: [
    cssModulesPlugin.technologies[0],
    {
      id: "sass",
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
    setUpSass: {
      id: "setUpSass",
      description: "setting up Sass",
      run: async () => {
        await writeFile("styles/global-styles.scss", generateGlobalStyles())
      },
    },
  },
  slots: {
    app: {
      imports: `import "../styles/global-styles.scss";`,
    },
  },
} as const)

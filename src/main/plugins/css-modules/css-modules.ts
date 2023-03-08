import fs from "fs/promises"
import { constrain } from "../../helpers/constrain"
import { writeFile } from "../../helpers/io"
import { Plugin } from "../../plugin"
import { generateGlobalStyles } from "./add-content/styles/global-styles"

export const cssModulesPlugin = constrain<Plugin>()({
  name: "CSS Modules",
  description: "Adds relevant CSS Modules boilerplate and documentation",
  technologies: [
    {
      name: "CSS Modules",
      description:
        "CSS Modules are CSS files in which all class names are scoped locally to the component importing them. This means that developers can use the same CSS class name in different files without worrying about naming conflicts. Gone are the days of writing BEM class names!",
      links: [
        { title: "Website", url: "https://github.com/css-modules/css-modules" },
        { title: "Docs", url: "https://github.com/css-modules/css-modules" },
        {
          title: "Next.js-specific docs",
          url: "https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css",
        },
      ],
    },
  ],
  steps: {
    setup: {
      description: "setting up CSS Modules",
      shouldRun: async ({ flags }) => Boolean(flags.styling === "css-modules"),
      run: async () => {
        await fs.mkdir("styles")
        await writeFile("styles/global-styles.css", generateGlobalStyles())
      },
    },
  },
} as const)

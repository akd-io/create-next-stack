import { constrain } from "../helpers/constrain"
import { Plugin } from "../plugin"

export const cssModulesPlugin = constrain<Plugin>()({
  name: "CSS Modules",
  description: "Adds relevant CSS Modules documentation",
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
} as const)

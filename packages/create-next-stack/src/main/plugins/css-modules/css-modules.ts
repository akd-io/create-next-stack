import { makeDirectory, writeFile } from "../../helpers/io"
import { createPlugin } from "../../plugin"
import { generateGlobalStyles } from "./add-content/styles/global-styles"

export const cssModulesPlugin = createPlugin({
  id: "css-modules",
  name: "CSS Modules",
  description: "Adds relevant CSS Modules boilerplate and documentation",
  active: ({ flags }) => Boolean(flags.styling === "css-modules"),
  technologies: [
    {
      id: "cssModules",
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
    setUpCssModules: {
      id: "setUpCssModules",
      description: "setting up CSS Modules",
      run: async () => {
        await makeDirectory("styles")
        await writeFile("styles/global-styles.css", generateGlobalStyles())
      },
    },
  },
  slots: {
    app: {
      imports: `import "../styles/global-styles.css";`,
    },
  },
} as const)

import endent from "endent"
import { createPlugin } from "../../plugin"

const globalStyles = endent`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    line-height: 1.5;
  }

  code {
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
      Bitstream Vera Sans Mono, Courier New, monospace;
  }

  a {
    color: inherit;
    text-decoration: none;
    font-weight: bold;
  }
`

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
  slots: {
    app: {
      imports: `import "../styles/global-styles.css";`,
    },
  },
  addFiles: [
    {
      destination: "styles/global-styles.css",
      content: globalStyles,
    },
  ],
} as const)

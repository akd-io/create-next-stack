import endent from "endent"
import { createPlugin } from "../../plugin"
import { cssModulesPlugin } from "../css-modules/css-modules"

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
  slots: {
    app: {
      imports: `import "../styles/global-styles.scss";`,
    },
  },
  addFiles: [
    {
      destination: "styles/global-styles.scss",
      content: globalStyles,
    },
  ],
} as const)

import endent from "endent"
import { makeDirectory, writeFile } from "../../helpers/io"
import { createPlugin } from "../../plugin"
import { generateIndexPage } from "./add-content/pages/generate-index"

export const pandaCSSPlugin = createPlugin({
  id: "panda-css",
  name: "Panda CSS",
  description: "Adds support for Panda CSS",
  active: ({ flags }) => flags["styling"] === "panda-css",
  devDependencies: {
    pandacss: {
      name: "@pandacss/dev",
      version: "^0.x.x",
    },
    autoprefixer: {
      name: "autoprefixer",
      version: "^10.0.0",
    },
    postcss: {
      name: "postcss",
      version: "^8.0.0",
    },
  },
  technologies: [
    {
      id: "pandaCSS",
      name: "Panda CSS",
      description:
        "🐼 Universal, Type-Safe, CSS-in-JS Framework for Product Teams ⚡️",
      links: [
        { title: "Website", url: "https://panda-css.com" },
        { title: "Docs", url: "https://panda-css.com/docs" },
        { title: "GitHub", url: "https://github.com/chakra-ui/panda" },
      ],
    },
  ],
  steps: {
    setUpPandaCss: {
      id: "setUpPandaCss",
      description: "setting up panda CSS",
      run: async () => {
        await Promise.all([
          addPandaConfig(),
          addPostcssConfig(),
          addStylesGlobalsCss(),
        ])
      },
    },
    addContent: {
      id: "addContent",
      description: "adding content",
      run: async (inputs) => {
        await Promise.all([
          writeFile("pages/index.tsx", generateIndexPage(inputs)),
        ])
      },
    },
  },
  scripts: [
    {
      name: "prepare",
      description: "Run panda codegen after dependencies are installed",
      command: "panda codegen",
    },
  ],
  slots: {
    app: {
      imports: `import "../styles/globals.css";`,
    },
  },
} as const)

const addPandaConfig = async () => {
  // From running `npx panda init --postcss` and adding globs to the include array according to https://panda-css.com/docs/installation/nextjs?value=pages-dir#configure-the-content
  const pandaConfigString = endent`
    import { defineConfig } from "@pandacss/dev";

    export default defineConfig({
      // Whether to use css reset
      preflight: true,
    
      // Where to look for your css declarations
      include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
    
      // Files to exclude
      exclude: [],
    
      // Useful for theme customization
      theme: {
        extend: {},
      },
    
      // The output directory for your css system
      outdir: "styled-system",
    });
  `
  await writeFile("panda.config.ts", pandaConfigString)
}

const addPostcssConfig = async () => {
  // From https://panda-css.com/docs/installation/nextjs?value=pages-dir#install-panda-css
  const postcssConfigString = endent`
    module.exports = {
      plugins: {
        '@pandacss/dev/postcss': {},
        autoprefixer: {},
      },
    }
  `
  await writeFile("postcss.config.js", postcssConfigString)
}

const addStylesGlobalsCss = async () => {
  // From https://panda-css.com/docs/installation/nextjs?value=pages-dir#configure-the-entry-css-with-layers
  const stylesGlobalsCssString = endent`
    @layer reset, base, tokens, recipes, utilities;
  `
  await makeDirectory("styles")
  await writeFile("styles/globals.css", stylesGlobalsCssString)
}

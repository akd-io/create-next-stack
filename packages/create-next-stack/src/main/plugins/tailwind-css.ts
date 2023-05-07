import endent from "endent"
import { makeDirectory, writeFile } from "../helpers/io"
import { createPlugin } from "../plugin"

/**
 * Follows a combination of the official Next.js template:
 * https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss
 * and the official Tailwind guide for Next.js:
 * https://tailwindcss.com/docs/guides/nextjs
 */

export const tailwindCSSPlugin = createPlugin({
  name: "Tailwind CSS",
  description: "Adds support for Tailwind CSS",
  active: ({ flags }) => flags["styling"] === "tailwind-css",
  devDependencies: {
    tailwindcss: {
      name: "tailwindcss",
      version: "^3.0.0",
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
  steps: {
    setup: {
      description: "setting up Tailwind CSS",
      run: async () => {
        await Promise.all([
          addTailwindConfig(),
          addPostcssConfig(),
          addStylesGlobalsCss(),
        ])
      },
    },
  },
  slots: {
    app: {
      imports: `import "../styles/globals.css";`,
    },
  },
} as const)

const addTailwindConfig = async () => {
  // From running `npx tailwind init -p --types` and adding globs to the content array according to https://tailwindcss.com/docs/guides/nextjs
  const tailwindConfigString = endent`
    /** @type {import('tailwindcss/types').Config} */
    const config = {
      content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }

    module.exports = config;
  `
  await writeFile("tailwind.config.js", tailwindConfigString)
}

const addPostcssConfig = async () => {
  // From https://github.com/vercel/next.js/blob/canary/examples/with-tailwindcss/postcss.config.js
  const postcssConfigString = endent`
    module.exports = {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    }
  `
  await writeFile("postcss.config.js", postcssConfigString)
}

const addStylesGlobalsCss = async () => {
  // From https://github.com/vercel/next.js/blob/canary/examples/with-tailwindcss/styles/globals.css
  const stylesGlobalsCssString = endent`
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  `
  await makeDirectory("styles")
  await writeFile("styles/globals.css", stylesGlobalsCssString)
}

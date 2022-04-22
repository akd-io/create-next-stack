import endent from "endent"
import { promises as fs } from "fs"
import { writeFile } from "../../helpers/io"
import { install, packages } from "../packages"
import { Step } from "../step"

/**
 * Follows a combination of the official Next.js template:
 * https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss
 * and the official Tailwind guide for Next.js:
 * https://tailwindcss.com/docs/guides/nextjs
 */
export const setUpTailwindCssStep: Step = {
  description: "setting up Tailwind CSS",

  shouldRun: async ({ flags }) => flags["styling"] === "tailwind-css",

  didRun: false,

  run: async ({ flags }) => {
    await install(
      [packages.tailwindcss, packages.autoprefixer, packages.postcss],
      flags["package-manager"],
      { dev: true }
    )

    await addTailwindConfig()
    await addPostcssConfig()
    await addStylesGlobalsCss()
  },
}

const addTailwindConfig = async () => {
  // From running `npx tailwind init -p --types` and adding globs to the content array according to https://tailwindcss.com/docs/guides/nextjs
  const tailwindConfigString = endent/* js */ `
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
  const postcssConfigString = endent/* js */ `
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
  const stylesGlobalsCssString = endent/* css */ `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  `
  await fs.mkdir("styles", { recursive: true })
  await writeFile("styles/globals.css", stylesGlobalsCssString)
}

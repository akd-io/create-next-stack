import endent from "endent"
import { Plugin } from "../plugin"

/**
 * Follows a combination of the official Next.js template:
 * https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss
 * and the official Tailwind guide for Next.js:
 * https://tailwindcss.com/docs/guides/nextjs
 */

export const tailwindCSSPlugin: Plugin = {
  id: "tailwind-css",
  name: "Tailwind CSS",
  description: "Adds support for Tailwind CSS",
  active: ({ flags }) => flags["styling"] === "tailwind-css",
  devDependencies: [
    { name: "tailwindcss", version: "^3.0.0" },
    { name: "autoprefixer", version: "^10.0.0" },
    { name: "postcss", version: "^8.0.0" },
  ],
  technologies: [
    {
      id: "tailwindCSS",
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
  slots: {
    app: {
      imports: `import "../styles/globals.css";`,
    },
  },
  addFiles: [
    {
      // From https://github.com/vercel/next.js/blob/canary/examples/with-tailwindcss/styles/globals.css`
      destination: "styles/globals.css",
      content: endent`
        @tailwind base;
        @tailwind components;
        @tailwind utilities;  
      `,
    },
    {
      // From running `npx tailwind init -p --types` and adding globs to the content array according to https://tailwindcss.com/docs/guides/nextjs
      destination: "tailwind.config.js",
      content: endent`
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
      `,
    },
    {
      // From https://github.com/vercel/next.js/blob/canary/examples/with-tailwindcss/postcss.config.js
      destination: "postcss.config.js",
      content: endent`
        module.exports = {
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          },
        }
      `,
    },
  ],
} as const

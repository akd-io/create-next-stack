import endent from "endent"
import { promises as fs } from "fs"
import { install, packages } from "../packages"
import { Step } from "../step"

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
  },
}

const addTailwindConfig = async () => {
  const tailwindConfigString = endent/* js */ `
    module.exports = {
      mode: 'jit',
      purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
      darkMode: false, // or 'media' or 'class'
      theme: {
        extend: {},
      },
      variants: {
        extend: {},
      },
      plugins: [],
    }
  `
  await fs.writeFile("tailwind.config.js", tailwindConfigString)
}

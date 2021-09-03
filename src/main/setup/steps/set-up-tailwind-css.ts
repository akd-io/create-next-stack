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
  },
}

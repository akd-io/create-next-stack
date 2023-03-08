import { constrain } from "../helpers/constrain"
import { writeFile } from "../helpers/io"
import { remove } from "../helpers/remove"
import { Plugin } from "../plugin"
import { generateNextConfig } from "../setup/steps/next-config/generate-next-config"

export const nextPlugin = constrain<Plugin>()({
  name: "Next.js",
  description: "Adds Next.js foundation",
  extDependencies: {
    "create-next-app": {
      name: "create-next-app",
      version: "~13.2.3", // Note: Equivalent to 13.2.x. However, when used with npx, the version is interpreted exactly instead of as a range.
    },
  },
  technologies: [
    {
      name: "Next.js",
      description:
        "Next.js is the leading framework in the React ecosystem, featuring server-side rendering and static site generation among other rendering techniques. Utilizing its file-based routing architecture and its zero-config design principle, it is designed to enhance both the user and developer experience.",
      links: [
        { title: "Website", url: "https://nextjs.org/" },
        { title: "Docs", url: "https://nextjs.org/docs" },
        { title: "Learn Next.js", url: "https://nextjs.org/learn" },
        { title: "GitHub", url: "https://github.com/vercel/next.js" },
        { title: "Wikipedia", url: "https://en.wikipedia.org/wiki/Next.js" },
      ],
    },
  ],
  scripts: [
    {
      name: "dev",
      description: "Runs the Next.js development server.",
      command: "next dev",
    },
    {
      name: "build",
      description: "Generates a production build.",
      command: "next build",
    },
    {
      name: "start",
      description:
        "Runs the Next.js production server built using `build` script.",
      command: "next start",
    },
    {
      name: "lint",
      description:
        "Runs [ESLint](https://eslint.org/) to catch linting errors in the source code.",
      command: "next lint",
    },
  ],
  steps: {
    addNextConfig: {
      description: "adding next.config.js",
      run: async (inputs) => {
        const nextConfigFileName = "next.config.js"
        await remove(nextConfigFileName)
        const nextConfigString = await generateNextConfig(inputs)
        await writeFile(nextConfigFileName, nextConfigString)
      },
    },
  },
} as const)

import { Plugin } from "../plugin"

export const npmPlugin: Plugin = {
  id: "npm",
  name: "npm",
  description: "Adds relevant npm documentation",
  active: ({ flags }) => Boolean(flags["package-manager"] === "npm"),
  technologies: [
    {
      id: "npm",
      name: "npm",
      description:
        "npm is the default package manager for Node.js. It consists of a command-line client, also called npm, and an online database of packages, called the npm registry, that enable developers to share and reuse code.",
      links: [
        { title: "Website", url: "https://www.npmjs.com/" },
        { title: "Docs", url: "https://docs.npmjs.com/" },
        { title: "GitHub", url: "https://github.com/npm/cli" },
      ],
    },
  ],
}

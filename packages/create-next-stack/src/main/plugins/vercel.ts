import type { Plugin } from "../plugin.ts"

export const vercelPlugin: Plugin = {
  id: "vercel",
  name: "Vercel",
  description: "Adds support for Vercel",
  active: ({ flags }) => Boolean(flags["vercel"]),
  devDependencies: [{ name: "vercel", version: "^50.0.0" }],
  scripts: [
    {
      name: "deploy:vercel",
      command: "vercel",
      description: "Deploy a preview deployment to Vercel",
    },
  ],
  technologies: [
    {
      id: "vercel",
      name: "Vercel",
      description:
        "Vercel is a modern hosting platform for websites and web apps. With zero configuration, it will build and deploy your site globally and serverlessly with a single command. It can also be set up to do continuous deployments by integrating it with your repository host.",
      links: [
        { title: "Website", url: "https://vercel.com/" },
        { title: "Docs", url: "https://vercel.com/docs" },
        { title: "CLI Docs", url: "https://vercel.com/docs/cli" },
      ],
    },
  ],
  todos: [
    "Integrate Vercel with your repository host for continuous deployments at https://vercel.com/new",
  ],
}

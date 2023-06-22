import { createPlugin } from "../plugin"

export const netlifyPlugin = createPlugin({
  id: "netlify",
  name: "Netlify",
  description: "Adds support for Netlify",
  active: ({ flags }) => Boolean(flags["netlify"]),
  devDependencies: [{ name: "netlify-cli", version: "^15.6.0" }],
  scripts: [
    {
      name: "deploy:netlify",
      command: "netlify deploy",
      description: "Deploy a preview deployment to Netlify",
    },
  ],
  technologies: [
    {
      id: "netlify",
      name: "Netlify",
      description:
        "Netlify is a modern hosting platform for websites and web apps. With zero configuration, it will build and deploy your site globally and serverlessly with a single command. It can also be set up to do continuous deployments by integrating it with your repository host.",
      links: [
        { title: "Website", url: "https://www.netlify.com/" },
        { title: "Docs", url: "https://docs.netlify.com/" },
        { title: "CLI Docs", url: "https://cli.netlify.com/" },
      ],
    },
  ],
  todos: [
    "Integrate Netlify with your repository host for continuous deployments at https://app.netlify.com/start. The Netlify CLI, mainly used for preview deployments, won't auto-detect Next.js until you do.",
  ],
} as const)

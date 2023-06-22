import endent from "endent"
import { createPlugin } from "../plugin"

const websiteDomainEnvVar = "NEXT_PUBLIC_WEBSITE_DOMAIN"

export const plausiblePlugin = createPlugin({
  id: "plausible",
  name: "Plausible",
  description: "Adds support for Plausible Analytics",
  active: ({ flags }) => flags["plausible"],
  dependencies: [{ name: "next-plausible", version: "^3.0.0" }],
  technologies: [
    {
      id: "plausible",
      name: "Plausible Analytics",
      description:
        "Plausible Analytics is an easy to use and privacy-friendly alternative to Google Analytics. It is intuitive, lightweight and open source. It also uses no cookies and is fully compliant with GDPR, CCPA and PECR. It is available both self-hosted and fully managed.",
      links: [
        { title: "Website", url: "https://plausible.io/" },
        { title: "Docs", url: "https://plausible.io/docs" },
        { title: "GitHub", url: "https://github.com/plausible/analytics" },
      ],
    },
    {
      id: "nextPlausible",
      name: "next-plausible",
      description:
        "next-plausible is a simple Next.js integration of Plausible Analytics. It will add the Plausible script for you, add a proxy to avoid ad-blockers, and let you send custom events.",
      links: [
        { title: "Website", url: "https://next-plausible.vercel.app/" },
        {
          title: "GitHub",
          url: "https://github.com/4lejandrito/next-plausible",
        },
      ],
    },
  ],
  slots: {
    app: {
      imports: endent`
        import PlausibleProvider from "next-plausible";
      `,
      postImports: endent`
        const ${websiteDomainEnvVar} = process.env.${websiteDomainEnvVar};
        if (${websiteDomainEnvVar} == null) {
          throw new Error("${websiteDomainEnvVar} is not set");
        }
      `,
      componentsStart: endent`
        <PlausibleProvider domain={${websiteDomainEnvVar}}>
      `,
      componentsEnd: endent`
        </PlausibleProvider>
      `,
    },
    nextConfigJs: {
      imports: endent`
        const { withPlausibleProxy } = require("next-plausible");
      `,
      wrappersStart: "withPlausibleProxy()(",
      wrappersEnd: ")",
    },
  },
  environmentVariables: [
    {
      name: websiteDomainEnvVar,
      description: "The domain of your website. Used by Plausible Analytics.",
      defaultValue: "example.com",
    },
  ],
  todos: [
    `Set up an account in Plausible Analytics, and add your website in their dashboard.`,
    `Update the \`${websiteDomainEnvVar}\` environment variable to your website's domain to connect Plausible Analytics to your app.`,
  ],
} as const)

import aldent from "aldent"
import type { Plugin } from "../plugin.ts"

const websiteDomainEnvVar = "NEXT_PUBLIC_WEBSITE_DOMAIN"

export const plausiblePlugin: Plugin = {
  id: "plausible",
  name: "Plausible",
  description: "Adds support for Plausible Analytics",
  active: ({ flags }) => flags["plausible"],
  dependencies: [{ name: "next-plausible", version: "^4.0.0" }],
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
    pagesApp: {
      imports: aldent`
        import PlausibleProvider from "next-plausible";
      `,
      postImports: aldent`
        const ${websiteDomainEnvVar} = process.env.${websiteDomainEnvVar};
        if (${websiteDomainEnvVar} == null) {
          throw new Error("${websiteDomainEnvVar} is not set");
        }
      `,
      componentsStart: aldent`
        <PlausibleProvider domain={${websiteDomainEnvVar}}>
      `,
      componentsEnd: aldent`
        </PlausibleProvider>
      `,
    },
    appLayout: {
      providerImports: aldent`
        import PlausibleProvider from "next-plausible";
      `,
      providerLogic: aldent`
        const ${websiteDomainEnvVar} = process.env.${websiteDomainEnvVar};
        if (${websiteDomainEnvVar} == null) {
          throw new Error("${websiteDomainEnvVar} is not set");
        }
      `,
      providersStart: aldent`
        <PlausibleProvider domain={${websiteDomainEnvVar}}>
      `,
      providersEnd: aldent`
        </PlausibleProvider>
      `,
    },
    nextConfig: {
      imports: aldent`
        import { withPlausibleProxy } from "next-plausible";
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
}

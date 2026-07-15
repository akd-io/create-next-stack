import aldent from "aldent"
import type { Plugin } from "../plugin.ts"

const authSecretEnvVar = "AUTH_SECRET"

export const authJsPlugin: Plugin = {
  id: "auth-js",
  name: "Auth.js",
  description: "Adds support for Auth.js (NextAuth v5)",
  active: ({ flags }) => Boolean(flags["auth-js"]),
  dependencies: [{ name: "next-auth", version: "beta" }],
  technologies: [
    {
      id: "authJs",
      name: "Auth.js",
      description:
        "Auth.js (formerly NextAuth.js) is a complete open-source authentication solution for Next.js applications. It provides a set of APIs for handling authentication flows, supporting OAuth providers, email/password, magic links, and more. Auth.js v5 brings native App Router support, server-side session handling, and a simplified configuration API.",
      links: [
        { title: "Website", url: "https://authjs.dev/" },
        { title: "Docs", url: "https://authjs.dev/getting-started" },
        { title: "GitHub", url: "https://github.com/nextauthjs/next-auth" },
      ],
    },
  ],
  environmentVariables: [
    {
      name: authSecretEnvVar,
      description:
        "A random value used by Auth.js to encrypt tokens and email verification hashes. Generate one with `npx auth secret`.",
      defaultValue: "your-secret-key",
    },
  ],
  todos: [
    `Generate an \`AUTH_SECRET\` by running \`npx auth secret\` and update the \`${authSecretEnvVar}\` environment variable.`,
    `Configure your authentication providers in \`auth.ts\` by adding them to the \`providers\` array. See https://authjs.dev/getting-started/providers/oauth for OAuth setup.`,
  ],
  addFiles: [
    {
      destination: "auth.ts",
      content: aldent`
        import NextAuth from "next-auth"

        export const { handlers, signIn, signOut, auth } = NextAuth({
          providers: [],
        })
      `,
    },
    {
      destination: "app/api/auth/[...nextauth]/route.ts",
      content: aldent`
        import { handlers } from "@/auth"

        export const { GET, POST } = handlers
      `,
    },
    {
      destination: "proxy.ts",
      content: aldent`
        export { auth as proxy } from "@/auth"
      `,
    },
  ],
}

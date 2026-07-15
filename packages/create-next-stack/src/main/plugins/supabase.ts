import aldent from "aldent"
import type { Plugin } from "../plugin.ts"

const supabaseUrlEnvVar = "NEXT_PUBLIC_SUPABASE_URL"
const supabaseAnonKeyEnvVar = "NEXT_PUBLIC_SUPABASE_ANON_KEY"

export const supabasePlugin: Plugin = {
  id: "supabase",
  name: "Supabase",
  description: "Adds support for Supabase",
  active: ({ flags }) => Boolean(flags["supabase"]),
  dependencies: [
    { name: "@supabase/supabase-js", version: "^2.0.0" },
    { name: "@supabase/ssr", version: "^0.6.0" },
  ],
  technologies: [
    {
      id: "supabase",
      name: "Supabase",
      description:
        "Supabase is an open source Firebase alternative. It provides a PostgreSQL database, authentication, file storage, and realtime subscriptions, all accessible via a single client library. Supabase is designed to be backend-in-a-box, offering everything you need to build a full-stack application without managing infrastructure.",
      links: [
        { title: "Website", url: "https://supabase.com/" },
        { title: "Docs", url: "https://supabase.com/docs" },
        {
          title: "GitHub",
          url: "https://github.com/supabase/supabase",
        },
      ],
    },
  ],
  environmentVariables: [
    {
      name: supabaseUrlEnvVar,
      description:
        "The URL of your Supabase project. Find it in your Supabase dashboard under Project Settings > API.",
      defaultValue: "https://your-project.supabase.co",
    },
    {
      name: supabaseAnonKeyEnvVar,
      description:
        "The anon (public) key of your Supabase project. Find it in your Supabase dashboard under Project Settings > API. This key is safe to expose in the browser.",
      defaultValue: "your-anon-key",
    },
  ],
  todos: [
    `Create a project at https://supabase.com/dashboard and copy your project URL and anon key.`,
    `Update the \`${supabaseUrlEnvVar}\` and \`${supabaseAnonKeyEnvVar}\` environment variables in \`.env\` with your Supabase project credentials.`,
  ],
  addFiles: [
    {
      destination: "lib/supabase/client.ts",
      content: aldent`
        import { createBrowserClient } from "@supabase/ssr"

        export const createClient = () =>
          createBrowserClient(
            process.env.${supabaseUrlEnvVar}!,
            process.env.${supabaseAnonKeyEnvVar}!,
          )
      `,
    },
    {
      destination: "lib/supabase/server.ts",
      content: aldent`
        import { cookies } from "next/headers"
        import { createServerClient } from "@supabase/ssr"

        export const createClient = async () => {
          const cookieStore = await cookies()

          return createServerClient(
            process.env.${supabaseUrlEnvVar}!,
            process.env.${supabaseAnonKeyEnvVar}!,
            {
              cookies: {
                getAll() {
                  return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                  try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                      cookieStore.set(name, value, options),
                    )
                  } catch {
                    // The \`setAll\` method was called from a Server Component.
                    // This can be ignored if you have middleware refreshing user sessions.
                  }
                },
              },
            },
          )
        }
      `,
    },
  ],
}

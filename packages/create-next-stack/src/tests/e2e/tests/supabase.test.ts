import { exists } from "../../../main/helpers/exists.ts"
import { testArgsWithFinalChecks } from "../helpers/test-args.ts"
import { twentyMinutes } from "../helpers/timeout.ts"

test(
  "testSupabase",
  async () => {
    const { runDirectory } = await testArgsWithFinalChecks([
      "--debug",
      "--package-manager=pnpm",
      "--styling=tailwind-css",
      "--supabase",
      ".",
    ])

    const clientExists = await exists(`${runDirectory}/lib/supabase/client.ts`)
    expect(clientExists).toBe(true)

    const serverExists = await exists(`${runDirectory}/lib/supabase/server.ts`)
    expect(serverExists).toBe(true)

    const envExists = await exists(`${runDirectory}/.env`)
    expect(envExists).toBe(true)
  },
  twentyMinutes,
)

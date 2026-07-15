import { exists } from "../../../main/helpers/exists.ts"
import { testArgsWithFinalChecks } from "../helpers/test-args.ts"
import { twentyMinutes } from "../helpers/timeout.ts"

test(
  "testVitest",
  async () => {
    const { runDirectory } = await testArgsWithFinalChecks([
      "--debug",
      "--package-manager=pnpm",
      "--styling=tailwind-css",
      "--vitest",
      ".",
    ])

    const vitestConfigExists = await exists(`${runDirectory}/vitest.config.ts`)
    expect(vitestConfigExists).toBe(true)
  },
  twentyMinutes,
)

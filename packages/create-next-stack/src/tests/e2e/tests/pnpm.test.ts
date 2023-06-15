import { expect, test } from "@jest/globals"
import { exists } from "../../../main/helpers/exists"
import { testArgsWithFinalChecks } from "../helpers/test-args"
import { fifteenMinutes } from "../helpers/timeout"

test(
  "testPnpm",
  async () => {
    const { runDirectory } = await testArgsWithFinalChecks([
      "--debug",
      "--package-manager=pnpm",
      "--styling=emotion",
      "--mantine",
      "--chakra",
      "--material-ui",
      "--react-hook-form",
      "--formik",
      "--framer-motion",
      "--prettier",
      "--formatting-pre-commit-hook",
      "--react-icons",
      "--react-query",
      "--plausible",
      "--vercel",
      "--netlify",
      ".",
    ])

    const yarnLockExists = await exists(`${runDirectory}/yarn.lock`)
    expect(yarnLockExists).toBe(false)

    const packageLockExists = await exists(`${runDirectory}/package-lock.json`)
    expect(packageLockExists).toBe(false)

    const pnpmLockExists = await exists(`${runDirectory}/pnpm-lock.yaml`)
    expect(pnpmLockExists).toBe(true)
  },
  fifteenMinutes
)

import { expect, test } from "@jest/globals"
import { exists } from "../../../main/helpers/exists"
import { testArgsWithFinalChecks } from "../helpers/test-args"
import { twentyMinutes } from "../helpers/timeout"

test(
  "testYarn",
  async () => {
    const { runDirectory } = await testArgsWithFinalChecks([
      "--debug",
      "--package-manager=yarn",
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
    expect(yarnLockExists).toBe(true)

    const packageLockExists = await exists(`${runDirectory}/package-lock.json`)
    expect(packageLockExists).toBe(false)

    const pnpmLockExists = await exists(`${runDirectory}/pnpm-lock.yaml`)
    expect(pnpmLockExists).toBe(false)
  },
  twentyMinutes
)

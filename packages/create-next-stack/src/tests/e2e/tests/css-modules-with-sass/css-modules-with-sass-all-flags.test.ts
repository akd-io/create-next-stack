import { test } from "@jest/globals"
import { testArgsWithFinalChecks } from "../../helpers/test-args"
import { twentyMinutes } from "../../helpers/timeout"

test(
  "testCssModulesWithSassAllFlags",
  async () => {
    await testArgsWithFinalChecks([
      "--debug",
      "--package-manager=pnpm",
      "--prettier",
      "--styling=css-modules-with-sass",
      "--react-hook-form",
      "--formik",
      "--framer-motion",
      "--formatting-pre-commit-hook",
      "--react-icons",
      "--react-query",
      "--plausible",
      "--vercel",
      "--netlify",
      ".",
    ])
  },
  twentyMinutes
)

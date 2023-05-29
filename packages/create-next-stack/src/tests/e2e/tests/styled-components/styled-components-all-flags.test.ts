import { test } from "@jest/globals"
import { testArgsWithFinalChecks } from "../../helpers/test-args"
import { tenMinutes } from "../../helpers/timeout"

test(
  "testStyledComponentsAllFlags",
  async () => {
    await testArgsWithFinalChecks([
      "--debug",
      "--package-manager=pnpm",
      "--prettier",
      "--styling=styled-components",
      "--react-hook-form",
      "--formik",
      "--framer-motion",
      "--formatting-pre-commit-hook",
      "--react-icons",
      "--react-query",
      ".",
    ])
  },
  tenMinutes
)

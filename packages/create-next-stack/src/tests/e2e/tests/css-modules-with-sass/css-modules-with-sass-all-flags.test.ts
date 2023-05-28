import { test } from "@jest/globals"
import { testArgsWithFinalChecks } from "../../helpers/test-args"

test(
  "testCssModulesWithSassAllFlags",
  async () => {
    testArgsWithFinalChecks([
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
      ".",
    ])
  },
  10 * 60 * 1000
)

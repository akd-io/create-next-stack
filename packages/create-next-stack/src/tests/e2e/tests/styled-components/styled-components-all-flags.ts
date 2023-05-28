import { test } from "@jest/globals"
import { testArgsWithFinalChecks } from "../../helpers/test-args"

test("testStyledComponentsAllFlags", async () => {
  testArgsWithFinalChecks([
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
})

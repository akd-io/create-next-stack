import { testArgsWithFinalChecks } from "../../helpers/test-args.ts"
import { twentyMinutes } from "../../helpers/timeout.ts"

test(
  "testCssModulesAllFlags",
  async () => {
    await testArgsWithFinalChecks([
      "--debug",
      "--package-manager=pnpm",
      "--prettier",
      "--styling=css-modules",
      "--react-hook-form",
      "--formik",
      "--framer-motion",
      "--formatting-pre-commit-hook",
      "--react-icons",
      "--react-query",
      "--plausible",
      "--github-actions",
      "--prisma",
      "--vercel",
      "--netlify",
      ".",
    ])
  },
  twentyMinutes,
)

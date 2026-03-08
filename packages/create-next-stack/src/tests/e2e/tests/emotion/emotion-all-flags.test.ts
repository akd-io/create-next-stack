import { testArgsWithFinalChecks } from "../../helpers/test-args.ts"
import { twentyMinutes } from "../../helpers/timeout.ts"

test(
  "testEmotionAllFlags",
  async () => {
    await testArgsWithFinalChecks([
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
      "--github-actions",
      "--prisma",
      "--vercel",
      "--netlify",
      ".",
    ])
  },
  twentyMinutes,
)

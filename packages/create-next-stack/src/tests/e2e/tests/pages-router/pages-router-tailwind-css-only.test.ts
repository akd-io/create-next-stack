import { testArgsWithFinalChecks } from "../../helpers/test-args.ts"
import { twentyMinutes } from "../../helpers/timeout.ts"

test(
  "testPagesRouterTailwindCssOnly",
  async () => {
    await testArgsWithFinalChecks([
      "--debug",
      "--router=pages",
      "--package-manager=pnpm",
      "--styling=tailwind-css",
      ".",
    ])
  },
  twentyMinutes,
)

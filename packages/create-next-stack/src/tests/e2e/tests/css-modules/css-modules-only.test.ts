import { testArgsWithFinalChecks } from "../../helpers/test-args.ts"
import { twentyMinutes } from "../../helpers/timeout.ts"

test(
  "testCssModulesOnly",
  async () => {
    await testArgsWithFinalChecks([
      "--debug",
      "--package-manager=pnpm",
      "--styling=css-modules",
      ".",
    ])
  },
  twentyMinutes,
)

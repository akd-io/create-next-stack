import { testArgsWithFinalChecks } from "../../helpers/test-args.ts"
import { twentyMinutes } from "../../helpers/timeout.ts"

test(
  "testStyledComponentsOnly",
  async () => {
    await testArgsWithFinalChecks([
      "--debug",
      "--package-manager=pnpm",
      "--styling=styled-components",
      ".",
    ])
  },
  twentyMinutes,
)

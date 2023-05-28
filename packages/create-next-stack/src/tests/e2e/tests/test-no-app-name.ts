import { test } from "@jest/globals"
import { runCommand } from "../../../main/helpers/run-command"
import { minutesToMilliseconds } from "../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../helpers/prepare-e2e-test"

test("testNoAppName", async () => {
  const { pathToCLI, runDirectory } = await prepareE2eTest()

  const argsVariants: string[][] = [
    //
    [],
    ["--debug"],
    ["--package-manager=pnpm"],
  ]

  for (const args of argsVariants) {
    await runCommand(pathToCLI, args, {
      timeout: minutesToMilliseconds(1),
      cwd: runDirectory,
    }).catch((error) => {
      if (
        !error.stderr.includes("Missing 1 required arg") ||
        !error.stderr.includes("app_name")
      ) {
        throw new Error(
          "Expected create-next-stack to error on missing app_name argument."
        )
      }
    })
  }
})

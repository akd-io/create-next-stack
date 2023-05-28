import { test } from "@jest/globals"
import { runCommand } from "../../../../main/helpers/run-command"
import { performE2eChecks } from "../../helpers/check-formatting-linting-build"
import { minutesToMilliseconds } from "../../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../../helpers/prepare-e2e-test"

test("testStyledComponentsOnly", async () => {
  const { pathToCLI, runDirectory } = await prepareE2eTest()

  const args = [
    "--debug",
    "--package-manager=pnpm",
    "--styling=styled-components",
    ".",
  ]

  await runCommand(pathToCLI, args, {
    timeout: minutesToMilliseconds(10),
    cwd: runDirectory,
    stdout: "inherit",
    stderr: "inherit",
  })

  await performE2eChecks(runDirectory, args)
})

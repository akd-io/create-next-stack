import { runCommand } from "../../../../main/helpers/run-command"
import { performE2eChecks } from "../../helpers/check-formatting-linting-build"
import { logTestMeta } from "../../helpers/log-test-meta"
import { minutesToMilliseconds } from "../../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../../helpers/prepare-e2e-test"

export const testStyledComponentsOnly = async (
  createNextStackDir: string
): Promise<void> => {
  logTestMeta(testStyledComponentsOnly.name, __filename)

  const { pathToCLI, runDirectory } = await prepareE2eTest(createNextStackDir)

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
}

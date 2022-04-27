import { prettyCommand } from "../../../../../main/helpers/pretty-command"
import { runCommand } from "../../../../../main/run-command"
import { checkFormattingLintingBuild } from "../../../helpers/check-formatting-linting-build"
import { minutesToMilliseconds } from "../../../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../../../helpers/prepare-e2e-test"
import { logTestInfo } from "../../../test-logging"

export const testCssModulesOnly = async (
  createNextStackDir: string
): Promise<void> => {
  const { pathToProdCLI, runDirectory } = await prepareE2eTest(
    createNextStackDir
  )

  const args = [
    "--debug",
    "--package-manager=npm",
    "--styling=css-modules",
    ".",
  ]

  logTestInfo("Running command:", prettyCommand(pathToProdCLI, args))

  await runCommand(pathToProdCLI, args, {
    timeout: minutesToMilliseconds(10),
    cwd: runDirectory,
    stdout: "inherit",
    stderr: "inherit",
  })

  await checkFormattingLintingBuild(runDirectory)
}

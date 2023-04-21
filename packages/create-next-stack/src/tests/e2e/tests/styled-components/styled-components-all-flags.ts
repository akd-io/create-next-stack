import { prettyCommand } from "../../../../main/helpers/pretty-command"
import { runCommand } from "../../../../main/helpers/run-command"
import { checkFormattingLintingBuild } from "../../helpers/check-formatting-linting-build"
import { minutesToMilliseconds } from "../../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../../helpers/prepare-e2e-test"
import { logTestInfo } from "../../test-logging"

export const testStyledComponentsAllFlags = async (
  createNextStackDir: string
): Promise<void> => {
  logTestInfo(`Running test: ${testStyledComponentsAllFlags.name}`)

  const { pathToCLI, runDirectory } = await prepareE2eTest(createNextStackDir)

  const args = [
    "--debug",
    "--package-manager=pnpm",
    "--prettier",
    "--styling=styled-components",
    "--react-hook-form",
    "--formik",
    "--framer-motion",
    "--formatting-pre-commit-hook",
    "--react-icons",
    ".",
  ]

  logTestInfo(
    "Running command:",
    prettyCommand(pathToCLI, args),
    "in directory:",
    runDirectory
  )

  await runCommand(pathToCLI, args, {
    timeout: minutesToMilliseconds(10),
    cwd: runDirectory,
    stdout: "inherit",
    stderr: "inherit",
  })

  await checkFormattingLintingBuild(runDirectory)
}

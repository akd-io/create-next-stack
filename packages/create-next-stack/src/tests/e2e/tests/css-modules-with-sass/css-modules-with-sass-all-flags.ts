import { runCommand } from "../../../../main/helpers/run-command"
import { checkFormattingLintingBuild } from "../../helpers/check-formatting-linting-build"
import { logTestMeta } from "../../helpers/log-test-meta"
import { minutesToMilliseconds } from "../../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../../helpers/prepare-e2e-test"

export const testCssModulesWithSassAllFlags = async (
  createNextStackDir: string
): Promise<void> => {
  logTestMeta(testCssModulesWithSassAllFlags.name, __filename)

  const { pathToCLI, runDirectory } = await prepareE2eTest(createNextStackDir)

  const args = [
    "--debug",
    "--package-manager=pnpm",
    "--prettier",
    "--styling=css-modules-with-sass",
    "--react-hook-form",
    "--formik",
    "--framer-motion",
    "--formatting-pre-commit-hook",
    "--react-icons",
    ".",
  ]

  await runCommand(pathToCLI, args, {
    timeout: minutesToMilliseconds(10),
    cwd: runDirectory,
    stdout: "inherit",
    stderr: "inherit",
  })

  await checkFormattingLintingBuild(runDirectory)
}

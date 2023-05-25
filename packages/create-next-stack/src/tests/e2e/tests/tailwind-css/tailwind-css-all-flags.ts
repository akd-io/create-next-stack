import { runCommand } from "../../../../main/helpers/run-command"
import { performE2eChecks } from "../../helpers/check-formatting-linting-build"
import { logTestMeta } from "../../helpers/log-test-meta"
import { minutesToMilliseconds } from "../../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../../helpers/prepare-e2e-test"

export const testTailwindCssAllFlags = async (
  createNextStackDir: string
): Promise<void> => {
  logTestMeta(testTailwindCssAllFlags.name, __filename)

  const { pathToCLI, runDirectory } = await prepareE2eTest(createNextStackDir)

  const args = [
    "--debug",
    "--package-manager=pnpm",
    "--prettier",
    "--styling=tailwind-css",
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

  await performE2eChecks(runDirectory, args)
}

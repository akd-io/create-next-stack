import { exists } from "../../../main/helpers/exists"
import { runCommand } from "../../../main/helpers/run-command"
import { performE2eChecks } from "../helpers/check-formatting-linting-build"
import { logTestMeta } from "../helpers/log-test-meta"
import { minutesToMilliseconds } from "../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../helpers/prepare-e2e-test"

export const testNpm = async (createNextStackDir: string): Promise<void> => {
  logTestMeta(testNpm.name, __filename)

  const { pathToCLI, runDirectory } = await prepareE2eTest(createNextStackDir)

  const args = [
    "--debug",
    "--package-manager=npm",
    "--styling=emotion",
    "--mantine",
    "--chakra",
    "--material-ui",
    "--react-hook-form",
    "--formik",
    "--framer-motion",
    "--prettier",
    "--formatting-pre-commit-hook",
    "--react-icons",
    "--react-query",
    ".",
  ]

  await runCommand(pathToCLI, args, {
    timeout: minutesToMilliseconds(10),
    cwd: runDirectory,
    stdout: "inherit",
    stderr: "inherit",
  })

  await performE2eChecks(runDirectory, args)

  if (await exists(`${runDirectory}/yarn.lock`)) {
    throw new Error(`yarn.lock found.`)
  }
  if (!(await exists(`${runDirectory}/package-lock.json`))) {
    throw new Error(`package-lock.json not found.`)
  }
  if (await exists(`${runDirectory}/pnpm-lock.yaml`)) {
    throw new Error(`pnpm-lock.yaml found.`)
  }
}

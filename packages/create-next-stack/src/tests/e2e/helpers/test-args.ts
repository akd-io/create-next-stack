import { runCommand } from "../../../main/helpers/run-command.ts"
import { performFinalChecks } from "./perform-final-checks.ts"
import { prepareE2eTest } from "./prepare-e2e-test.ts"
import { twentyMinutes } from "./timeout.ts"

/**
 * Prepare an e2e test and run the CLI with the given arguments.
 *
 * @param args Arguments to pass to the CLI.
 * @returns The directory where the CLI was run.
 */
export const testArgsWithoutFinalChecks = async (args: string[]) => {
  const { pathToCLI, runDirectory } = await prepareE2eTest()

  const env = { ...process.env }
  delete env["CI"]
  delete env["GITHUB_ACTIONS"]

  await runCommand(pathToCLI, args, {
    timeout: twentyMinutes,
    cwd: runDirectory,
    stdout: "inherit",
    stderr: "inherit",
    env,
  })

  return { runDirectory }
}

/**
 * Prepare an e2e test, run the CLI with the given arguments, and perform final checks.
 *
 * @param args Arguments to pass to the CLI.
 * @returns The directory where the CLI was run.
 */
export const testArgsWithFinalChecks = async (args: string[]) => {
  const { runDirectory } = await testArgsWithoutFinalChecks(args)

  await performFinalChecks(runDirectory, args)

  return { runDirectory }
}

import { runCommand } from "../../../main/helpers/run-command"
import { minutesToMilliseconds } from "./minutes-to-milliseconds"
import { performFinalChecks } from "./perform-final-checks"
import { prepareE2eTest } from "./prepare-e2e-test"

export const testArgsWithoutFinalChecks = async (args: string[]) => {
  const { pathToCLI, runDirectory } = await prepareE2eTest()

  await runCommand(pathToCLI, args, {
    timeout: minutesToMilliseconds(10),
    cwd: runDirectory,
    stdout: "inherit",
    stderr: "inherit",
  })

  return { runDirectory }
}

export const testArgsWithFinalChecks = async (args: string[]) => {
  const { runDirectory } = await testArgsWithoutFinalChecks(args)

  await performFinalChecks(runDirectory, args)

  return { runDirectory }
}

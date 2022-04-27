import { prettyCommand } from "../../../main/helpers/pretty-command"
import { runCommand } from "../../../main/run-command"
import { minutesToMilliseconds } from "../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../helpers/prepare-e2e-test"
import { logTestInfo } from "../test-logging"

export const testNoFlags = async (
  createNextStackDir: string
): Promise<void> => {
  const { pathToProdCLI, runDirectory } = await prepareE2eTest(
    createNextStackDir
  )

  const argsVariants: string[][] = [
    [],
    ["--debug"],
    ["app-name"],
    ["--debug app-name"],
  ]

  for (const args of argsVariants) {
    logTestInfo("Running command:", prettyCommand(pathToProdCLI, args))

    const result = await runCommand(pathToProdCLI, args, {
      timeout: minutesToMilliseconds(1),
      cwd: runDirectory,
    })

    if (
      !result.stdout.includes(
        "Please visit https://create-next-stack.com/ to pick your technologies."
      )
    ) {
      throw new Error("Expected create-next-stack to post link to website.")
    }
  }
}

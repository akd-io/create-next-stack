import { runCommand } from "../../../main/helpers/run-command"
import { logTestMeta } from "../helpers/log-test-meta"
import { minutesToMilliseconds } from "../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../helpers/prepare-e2e-test"

export const testNoFlags = async (
  createNextStackDir: string
): Promise<void> => {
  logTestMeta(testNoFlags.name, __filename)

  const { pathToCLI, runDirectory } = await prepareE2eTest(createNextStackDir)

  const argsVariants: string[][] = [
    [],
    ["--debug"],
    ["app-name"],
    ["app-name --debug"],
  ]

  for (const args of argsVariants) {
    const result = await runCommand(pathToCLI, args, {
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

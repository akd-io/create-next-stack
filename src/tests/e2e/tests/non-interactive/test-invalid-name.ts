import execa from "execa"
import { minutesToMilliseconds } from "../../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../../helpers/prepare-e2e-test"
import { logTestInfo } from "../../test-logging"

export const testInvalidName = async (createNextStackDir: string) => {
  const { pathToProdCLI, runDirectory } = await prepareE2eTest(
    createNextStackDir
  )

  const args = ["INVALID-NAME"]

  logTestInfo(`Running command: ${pathToProdCLI} ${args.join(" ")}`)

  let didThrowError = false
  await execa(pathToProdCLI, args, {
    timeout: minutesToMilliseconds(1),
    cwd: runDirectory,
    stdout: "inherit",
    stderr: "ignore",
  }).catch(() => {
    didThrowError = true
  })

  if (!didThrowError) {
    throw new Error("Expected invalid name to cause an error!")
  }
}

import fs from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import { makeDirectory } from "../../../main/helpers/io"
import { logTestInfo } from "../test-logging"

export const prepareE2eTest = async (
  createNextStackDir: string
): Promise<{
  pathToProdCLI: string
  runDirectory: string
}> => {
  // Create unique id for this run
  const testRunId = uuidv4()

  // Switch to unique test directory
  const runDirectory = path.resolve(
    `${createNextStackDir}/../create-next-stack-tests/run-${testRunId}`
  )
  logTestInfo(`Creating test run directory at ${runDirectory}`)
  await makeDirectory(runDirectory)

  // Run /bin-test/run-prod to test against compiled js files in /lib instead of ts-files in /src using ts-node.
  const pathToProdCLI = path.resolve(`${createNextStackDir}/bin-test/run-prod`)

  logTestInfo(`Making /bin-test/run-prod readable and executable by all...`)
  await fs.chmod(pathToProdCLI, 0o555)

  return {
    pathToProdCLI,
    runDirectory,
  }
}

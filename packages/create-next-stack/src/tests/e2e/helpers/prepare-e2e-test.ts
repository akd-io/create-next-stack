import fs from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import { makeDirectory } from "../../../main/helpers/io"
import { logTestInfo } from "../test-logging"

export const prepareE2eTest = async (
  createNextStackDir: string
): Promise<{
  pathToCLI: string
  runDirectory: string
}> => {
  const testRunId = uuidv4()

  const runDirectory = path.resolve(
    createNextStackDir,
    `../../../create-next-stack-tests/run-${testRunId}`
  )
  logTestInfo(`Creating test run directory at ${runDirectory}`)
  await makeDirectory(runDirectory)

  const relPathToCLI = "./bin/dev"
  const pathToCLI = path.resolve(createNextStackDir, relPathToCLI)

  logTestInfo(`Making ${relPathToCLI} readable and executable by all...`)
  await fs.chmod(pathToCLI, 0o555)

  return {
    pathToCLI,
    runDirectory,
  }
}

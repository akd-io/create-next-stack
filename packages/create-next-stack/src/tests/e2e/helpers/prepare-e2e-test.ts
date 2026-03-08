import fs from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import { makeDirectory } from "../../../main/helpers/io.ts"
import { logTestInfo } from "../test-logging.ts"
import { setGitNameAndEmailIfMissing } from "./set-git-name-and-email.ts"

/**
 * Prepare an e2e test by creating a directory to run the CLI in.
 *
 * @returns The path to the CLI and the directory where the CLI was run.
 */
export const prepareE2eTest = async (): Promise<{
  pathToCLI: string
  runDirectory: string
}> => {
  process.env["TEST"] = "true"
  await setGitNameAndEmailIfMissing()

  const createNextStackDir = path.resolve(process.cwd())

  const testRunId = uuidv4()

  const runDirectory = path.resolve(
    createNextStackDir,
    `../../../create-next-stack-tests/run-${testRunId}`,
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

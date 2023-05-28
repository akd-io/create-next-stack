import fs from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import { makeDirectory } from "../../../main/helpers/io"
import { logTestInfo } from "../test-logging"
import { setGitNameAndEmailIfMissing } from "./set-git-name-and-email"

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

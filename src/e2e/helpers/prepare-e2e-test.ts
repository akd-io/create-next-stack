import console from "console"
import { promises as fs } from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

export const prepareE2eTest = async (): Promise<{
  pathToProdCLI: string
}> => {
  const createNextStackDir = process.cwd()

  // Create unique id for this run
  const testRunId = uuidv4()

  // Switch to unique test directory
  const runDirectory = path.resolve(
    `../create-next-stack-tests/run-${testRunId}`
  )
  await fs.mkdir(runDirectory, { recursive: true })
  process.chdir(runDirectory)
  console.log(`Created test run directory at ${runDirectory}`)

  // Run /bin/run-prod to test against compiled js files in /lib instead of ts-files in /src using ts-node.
  const pathToProdCLI = path.resolve(`${createNextStackDir}/bin/run-prod`)

  console.log(`Making /bin/run readable and executable by all.`)
  await fs.chmod(pathToProdCLI, 0o555)

  return {
    pathToProdCLI,
  }
}

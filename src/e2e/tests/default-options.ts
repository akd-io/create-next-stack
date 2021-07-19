import console from "console"
import execa from "execa"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

export const testDefaultOptions = async () => {
  const createNextStackDir = process.cwd()

  // Create unique id for this run
  const testRunId = uuidv4()

  // Switch to unique test directory
  const runDirectory = path.resolve(
    `../create-next-stack-tests/run-${testRunId}`
  )
  fs.mkdirSync(runDirectory, { recursive: true })
  process.chdir(runDirectory)
  console.log(`Created test run directory at ${runDirectory}`)

  const pathToCLI = path.resolve(`${createNextStackDir}/bin/run`)

  console.log(`Making /bin/run readable and executable by all.`)
  fs.chmodSync(pathToCLI, 0o555)

  console.log(`Running command: ${pathToCLI} --debug .`)
  const execaProcess = execa(pathToCLI, ["--debug", "."], {
    timeout: 10 * 60 * 1000,
  }) // 10 minutes
  execaProcess.stdout?.pipe(process.stdout)
  execaProcess.stderr?.pipe(process.stderr)

  console.log("Sending \\n to accept default options.")
  execaProcess.stdin?.write("\n") // Press

  await execaProcess

  console.log("Checking formatting")
  await execa("npx", ["prettier", "--check", "--ignore-path=.gitignore", "."])

  console.log("Checking linting")
  await execa("yarn", ["lint"])

  console.log("Running yarn build")
  await execa("yarn", ["build"])
}

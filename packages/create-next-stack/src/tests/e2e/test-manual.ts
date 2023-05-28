import chalk from "chalk"
import endent from "endent"
import { v4 as uuidv4 } from "uuid"
import { runCommand } from "../../main/helpers/run-command"
import { exitWithError } from "./helpers/exit-with-error"
import { performFinalChecks } from "./helpers/perform-final-checks"
import { logTestInfo } from "./test-logging"
;(async () => {
  process.env["TEST"] = "true"

  try {
    const projectName = uuidv4()
    const runDirectory = `../../../create-next-stack-tests/${projectName}`

    const pathToCLI = "./bin/dev"
    const args = [...process.argv.slice(2), runDirectory]
    await runCommand(pathToCLI, args, { stdio: "inherit" })

    await performFinalChecks(runDirectory, args)

    logTestInfo("")
    logTestInfo(endent`
      ${chalk.green("Test successful!")}

      To open the project in vscode, run:

          ${chalk.cyan(`code ${runDirectory}`)}
    `)
    logTestInfo("")
  } catch (error) {
    exitWithError(error)
  }
})()

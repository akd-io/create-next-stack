import chalk from "chalk"
import endent from "endent"
import { v4 as uuidv4 } from "uuid"
import { prettyCommand } from "../../main/helpers/pretty-command"
import { runCommand } from "../../main/helpers/run-command"
import { exitWithError } from "./helpers/exit-with-error"
import { logTestInfo } from "./test-logging"
;(async () => {
  try {
    const projectName = uuidv4()
    const runDirectory = `../../../create-next-stack-tests/${projectName}`

    const command = "npx"
    const args = [
      "create-next-app@latest",
      runDirectory,
      ...process.argv.slice(2),
    ]

    logTestInfo("Running command:", prettyCommand(command, args))
    await runCommand(command, args, { stdio: "inherit" })

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

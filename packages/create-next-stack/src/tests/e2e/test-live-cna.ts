import chalk from "chalk"
import aldent from "aldent"
import { v4 as uuidv4 } from "uuid"
import { runCommand } from "../../main/helpers/run-command.ts"
import { exitWithError } from "./helpers/exit-with-error.ts"
import { logTestInfo } from "./test-logging.ts"
;(async () => {
  process.env["TEST"] = "true"

  try {
    const projectName = uuidv4()
    const runDirectory = `../../../create-next-stack-tests/${projectName}`

    const command = "npx"
    const args = [
      "create-next-app@latest",
      runDirectory,
      ...process.argv.slice(2),
    ]

    await runCommand(command, args, { stdio: "inherit" })

    logTestInfo("")
    logTestInfo(aldent`
      ${chalk.green("Test successful!")}

      To open the project in vscode, run:

          ${chalk.cyan(`code ${runDirectory}`)}
    `)
    logTestInfo("")
  } catch (error) {
    exitWithError(error)
  }
})()

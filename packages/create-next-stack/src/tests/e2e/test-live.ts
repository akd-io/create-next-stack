import chalk from "chalk"
import endent from "endent"
import { v4 as uuidv4 } from "uuid"
import { prettyCommand } from "../../main/helpers/pretty-command"
import { runCommand } from "../../main/run-command"
import { checkFormattingLintingBuild } from "./helpers/check-formatting-linting-build"
import { exitWithError } from "./helpers/exit-with-error"
import { logTestInfo } from "./test-logging"
;(async () => {
  try {
    const projectName = uuidv4()
    const runDirectory = `../create-next-stack-tests/${projectName}`

    const command = "npx"
    const args = [
      "create-next-stack@latest",
      ...process.argv.slice(2),
      runDirectory,
    ]

    logTestInfo("Running command:", prettyCommand(command, args))

    await runCommand(command, args, { stdio: "inherit" })

    await checkFormattingLintingBuild(runDirectory)

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

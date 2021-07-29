import execa from "execa"
import { v4 as uuidv4 } from "uuid"
import { checkFormattingLintingBuild } from "./helpers/check-formatting-linting-build"
import { logTestInfo } from "./test-logging"
;(async () => {
  const projectName = uuidv4()
  const runDirectory = `../create-next-stack-tests/${projectName}`

  const command = "./bin/run-prod"
  const args = [...process.argv.slice(2), runDirectory]

  logTestInfo(`Running command: ${command} ${args.join(" ")}`)

  await execa(command, args, { stdio: "inherit" })

  await checkFormattingLintingBuild(runDirectory)

  logTestInfo("")
  logTestInfo(`To open project in vscode, run:`)
  logTestInfo("")
  logTestInfo(`    code ${runDirectory}`)
  logTestInfo("")
})()

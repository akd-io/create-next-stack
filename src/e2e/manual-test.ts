import execa from "execa"
import { v4 as uuidv4 } from "uuid"
import { checkFormattingLintingBuild } from "./helpers/check-formatting-linting-build"
import { logTestInfo } from "./helpers/test-logging"
;(async () => {
  const projectName = uuidv4()
  const runDirectory = `../create-next-stack-tests/${projectName}`

  logTestInfo(`Running Create Next Stack...`)
  await execa("./bin/run-prod", [runDirectory], {
    stdio: "inherit",
  })

  await checkFormattingLintingBuild(runDirectory)

  logTestInfo(`Open in vscode with:`)
  logTestInfo(`    code ${runDirectory}`)
})()

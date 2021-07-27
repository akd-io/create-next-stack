import execa from "execa"
import { v4 as uuidv4 } from "uuid"
import { logTestInfo } from "./helpers/test-logging"
;(async () => {
  const projectName = uuidv4()

  logTestInfo(`Running Create Next Stack...`)
  await execa("./bin/run-prod", [`../create-next-stack-tests/${projectName}`], {
    stdio: "inherit",
  })

  logTestInfo(`Open in vscode with:`)
  logTestInfo(`    code ../create-next-stack-tests/${projectName}`)
})()

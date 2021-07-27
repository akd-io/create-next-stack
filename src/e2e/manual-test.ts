import console from "console"
import execa from "execa"
import { v4 as uuidv4 } from "uuid"
;(async () => {
  const projectName = uuidv4()

  console.log("Preparing production build of Create Next Stack...")
  await execa("yarn", ["build"], { stdio: "inherit" })

  console.log(`Running Create Next Stack...`)
  await execa("./bin/run-prod", [`../create-next-stack-tests/${projectName}`], {
    stdio: "inherit",
  })

  console.log(`Open in vscode with:`)
  console.log(`    code ../create-next-stack-tests/${projectName}`)
})()

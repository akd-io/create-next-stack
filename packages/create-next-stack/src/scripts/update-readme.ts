import endent from "endent"
import execa from "execa"
import { promises as fs } from "fs"
import { join, resolve } from "path"
import { generateTechnologyTableRows } from "../main/plugins/create-next-stack/add-readme/generate-technology-table-rows"
import { getAllTechnologies } from "../main/plugins/create-next-stack/sort-orders/technologies"

const startOfTechnologiesTableString =
  "<!-- CNS-START-OF-TECHNOLOGIES-TABLE -->"
const endOfTechnologiesTableString = "<!-- CNS-END-OF-TECHNOLOGIES-TABLE -->"
const startOfHelpOutputString = "<!-- CNS-START-OF-HELP-OUTPUT -->"
const endOfHelpOutputString = "<!-- CNS-END-OF-HELP-OUTPUT -->"

;(async () => {
  const readmePath = resolve(join(__dirname, "..", "..", "README.md"))
  console.log(`README.md found at ${readmePath}`)

  console.log(`Reading README.md...`)
  const readme = await fs.readFile(readmePath, "utf-8")

  console.log(`Generating new README.md...`)
  const { stdout: helpOutput } = await execa("pnpm", [
    "--silent",
    "run",
    "print:help",
  ])
  const technologyTableRows = await generateTechnologyTableRows(
    getAllTechnologies()
  )

  const updatedReadme = readme
    .replace(
      new RegExp(
        `${startOfTechnologiesTableString}[\\s\\S]*${endOfTechnologiesTableString}`
      ),
      endent`
        ${startOfTechnologiesTableString}

        | Name | Links |
        | ---- | ----- |
        ${technologyTableRows}

        ${endOfTechnologiesTableString}
      `
    )
    .replace(
      new RegExp(`${startOfHelpOutputString}[\\s\\S]*${endOfHelpOutputString}`),
      endent`
        ${startOfHelpOutputString}

        \`\`\`
        ${helpOutput.trim()}
        \`\`\`

        ${endOfHelpOutputString}
      `
    )

  console.log(`Writing README.md...`)
  await fs.writeFile(readmePath, updatedReadme)
  console.log(`Staging README.md...`)
  await execa("git", ["add", readmePath])
})()

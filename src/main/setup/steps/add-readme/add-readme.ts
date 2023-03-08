import { constrain } from "../../../helpers/constrain"
import { writeFile } from "../../../helpers/io"
import { remove } from "../../../helpers/remove"
import { Step } from "../../../plugin"
import { generateReadme } from "./generate-readme"

export const addReadmeStep = constrain<Step>()({
  description: "adding Readme",
  run: async (inputs) => {
    const readmeFileName = "README.md"
    await remove(readmeFileName)
    const readmeString = await generateReadme(inputs)
    await writeFile(readmeFileName, readmeString)
  },
})

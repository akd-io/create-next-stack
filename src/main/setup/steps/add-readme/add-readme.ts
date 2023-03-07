import { writeFile } from "../../../helpers/io"
import { remove } from "../../../helpers/remove"
import { Step } from "../../step"
import { generateReadme } from "./generate-readme"

export const addReadmeStep: Step = {
  description: "adding Readme",

  shouldRun: async () => true,

  didRun: false,

  run: async (inputs) => {
    const readmeFileName = "README.md"
    await remove(readmeFileName)
    const readmeString = await generateReadme(inputs)
    await writeFile(readmeFileName, readmeString)
  },
}

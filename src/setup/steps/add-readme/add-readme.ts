import { promises as fs } from "fs"
import { Step } from "../../step"
import { generateReadme } from "./generate-readme"

export const addReadmeStep: Step = {
  description: "adding Readme",

  shouldRun: async () => true,

  didRun: false,

  run: async (inputs) => {
    const readmeString = await generateReadme(inputs)
    await fs.writeFile("README.md", readmeString)
  },
}

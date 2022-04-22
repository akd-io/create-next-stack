import { writeFile } from "../../../helpers/io"
import { Step } from "../../step"
import { generateReadme } from "./generate-readme"

export const addReadmeStep: Step = {
  description: "adding Readme",

  shouldRun: async () => true,

  didRun: false,

  run: async (inputs) => {
    const readmeString = await generateReadme(inputs)
    await writeFile("README.md", readmeString)
  },
}

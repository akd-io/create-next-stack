import { writeFile } from "../../../helpers/io"
import { remove } from "../../../helpers/remove"
import { Step } from "../../step"
import { generateNextConfig } from "./generate-next-config"

export const addNextConfigStep: Step = {
  description: "adding next.config.js",

  shouldRun: async () => true,

  didRun: false,

  run: async (inputs) => {
    const nextConfigFileName = "next.config.js"
    await remove(nextConfigFileName)
    const nextConfigString = await generateNextConfig(inputs)
    await writeFile(nextConfigFileName, nextConfigString)
  },
}

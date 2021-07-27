import path from "path"
import { copyDirectory } from "../../helpers/copy-directory"
import { getCreateNextStackDir } from "../../helpers/get-create-next-stack-dir"
import { Step } from "../step"

export const copyAssetsStep: Step = {
  shouldRun: async () => true,

  didRun: false,

  run: async (): Promise<void> => {
    const createNextStackDir = getCreateNextStackDir()
    const source = path.resolve(`${createNextStackDir}/prod-assets`)
    const destination = path.resolve(".")
    await copyDirectory(source, destination)
  },
}

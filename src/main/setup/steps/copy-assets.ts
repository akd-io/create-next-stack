import path from "path"
import { copyDirectory } from "../../helpers/copy-directory"
import { getCreateNextStackDir } from "../../helpers/get-create-next-stack-dir"
import { Step } from "../../plugin"

export const copyAssetsStep: Step = {
  description: "copying static assets",
  run: async (): Promise<void> => {
    const createNextStackDir = getCreateNextStackDir()
    const source = path.resolve(`${createNextStackDir}/prod-assets`)
    const destination = path.resolve(".")
    await copyDirectory(source, destination)
  },
}

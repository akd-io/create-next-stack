import path from "path"
import { fileURLToPath } from "url"

export const getCreateNextStackDir = (): string => {
  return path.dirname(
    fileURLToPath(import.meta.resolve("create-next-stack/package.json")),
  )
}

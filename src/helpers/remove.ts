import fs from "fs/promises"

export const remove = (path: string): Promise<void> => {
  return fs.rm(path, {
    recursive: true,
    force: true,
  })
}

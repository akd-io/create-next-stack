import fs from "fs/promises"

export const isGitInitialized = async (): Promise<boolean> => {
  try {
    await fs.access(".git")
    return true
  } catch {
    return false
  }
}

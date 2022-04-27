import path from "path"
import { logError } from "../logging"

export const getProjectNameOfPath = (projectPath: string): string => {
  try {
    return path.basename(path.resolve(projectPath))
  } catch (error) {
    logError(
      "Failed to resolve and get basename of project name. Project name must be a valid path."
    )
    throw error
  }
}

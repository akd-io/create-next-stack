import path from "path"

export const getProjectNameOfPath = (projectPath: string): string => {
  return path.basename(path.resolve(projectPath))
}

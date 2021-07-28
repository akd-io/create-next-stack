import path from "path"

export const getCreateNextStackDir = (): string => {
  return path.dirname(require.resolve("create-next-stack/package.json"))
}

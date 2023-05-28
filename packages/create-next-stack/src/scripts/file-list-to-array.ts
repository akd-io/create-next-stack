// This script reads each line of stdin and outputs a JSON array of the lines.
// This is useful for passing a list of files to a command.
// Example usage: `ls | node file-list-to-array.ts`
let input = ""
process.stdin.on("data", (data) => {
  input += data.toString()
})
process.stdin.on("end", () => {
  const filePaths = input.split("\n").filter(Boolean)
  const files = filePaths.map((filePath) => ({
    filePath: filePath,
    fileName: filePath.split("/").pop()?.split(".")[0] || filePath,
  }))
  console.log(JSON.stringify(files))
})

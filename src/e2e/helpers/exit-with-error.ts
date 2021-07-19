import console from "console"

export const exitWithError = async (error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message)
  } else if (typeof error === "string") {
    console.error(error)
  } else {
    console.error("Error: An error object of unknown type was thrown.")
  }
  process.exit(1)
}

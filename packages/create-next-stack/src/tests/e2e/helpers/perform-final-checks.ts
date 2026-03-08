import { existsSync } from "fs"
import { unlink, writeFile } from "fs/promises"
import path from "path"
import type { Options } from "execa"
import { runCommand } from "../../../main/helpers/run-command.ts"
import { logTestInfo } from "../test-logging.ts"

const lockFileIgnore = "pnpm-lock.yaml\npackage-lock.json\nyarn.lock\n"

export const performFinalChecks = async (
  runDirectory: string,
  args: string[],
): Promise<void> => {
  const options: Options = {
    cwd: runDirectory,
  }

  // If no .prettierignore exists (prettier not selected), create a temporary
  // one to ignore lock files modified by uninstallTemporaryDependencies.
  const prettierIgnorePath = path.join(runDirectory, ".prettierignore")
  const tempPrettierIgnore = !existsSync(prettierIgnorePath)
  if (tempPrettierIgnore) {
    await writeFile(prettierIgnorePath, lockFileIgnore)
  }

  logTestInfo("Checking formatting...")
  try {
    await runCommand("npx", ["prettier", "--check", "."], options)
  } finally {
    if (tempPrettierIgnore) {
      await unlink(prettierIgnorePath)
    }
  }

  logTestInfo("Checking linting...")
  await runCommand("npm", ["run", "lint"], options)

  logTestInfo("Running build...")
  await runCommand("npm", ["run", "build"], options)

  const packageManager = args
    .find((arg) => arg.startsWith("--package-manager="))
    ?.split("=")[1]
  if (packageManager) {
    logTestInfo("Installing dependencies...")
    const installArgs =
      packageManager === "pnpm"
        ? ["install", "--no-frozen-lockfile"]
        : ["install"]
    await runCommand(packageManager, installArgs, options)
  }
}

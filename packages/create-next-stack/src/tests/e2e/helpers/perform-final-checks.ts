import type { Options } from "execa"
import { runCommand } from "../../../main/helpers/run-command.ts"
import { logTestInfo } from "../test-logging.ts"

export const performFinalChecks = async (
  runDirectory: string,
  args: string[],
): Promise<void> => {
  const options: Options = {
    cwd: runDirectory,
  }

  logTestInfo("Checking formatting...")
  await runCommand("npx", ["prettier", "--check", "."], options)

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

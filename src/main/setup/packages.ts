import { prettyCommand } from "../helpers/pretty-command"
import { logDebug } from "../logging"
import { runCommand } from "../run-command"

type Package<T = string> = Readonly<{
  name: T
  version: string
}>

type InstallPackageOptions = {
  dev?: boolean
}
export const install = async (
  npmPackage: Package | Package[],
  packageManager: "yarn" | "npm",
  options?: InstallPackageOptions
): Promise<void> => {
  const packageArray = Array.isArray(npmPackage) ? npmPackage : [npmPackage]

  if (packageArray.length < 1) return

  const packagesWithVersions = packageArray.map((pkg) =>
    getNameVersionCombo(pkg)
  )

  const installSubCommand = packageManager === "yarn" ? "add" : "install"
  const installCommandArgs = [installSubCommand]
  if (typeof options?.dev == "boolean" && options.dev) {
    installCommandArgs.push("--dev")
  }
  packagesWithVersions.forEach((packageWithVersion) => {
    installCommandArgs.push(packageWithVersion)
  })

  logDebug(
    `Installing dependencies with command:`,
    prettyCommand(packageManager, installCommandArgs)
  )
  await runCommand(packageManager, installCommandArgs)
}

export const uninstall = async (
  npmPackage: Package | Package[],
  packageManager: "yarn" | "npm"
): Promise<void> => {
  const packageArray = Array.isArray(npmPackage) ? npmPackage : [npmPackage]

  if (packageArray.length < 1) return

  const packageNames = packageArray.map((npmPackage) => npmPackage.name)

  const uninstallSubCommand = packageManager === "yarn" ? "remove" : "uninstall"
  const uninstallCommandArgs = [uninstallSubCommand, ...packageNames]

  logDebug(
    `Uninstalling dependencies with command:`,
    prettyCommand(packageManager, uninstallCommandArgs)
  )
  await runCommand(packageManager, uninstallCommandArgs)
}

export const getNameVersionCombo = (npmPackage: Package): string => {
  return `${npmPackage.name}@${npmPackage.version}`
}

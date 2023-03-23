import {
  installSubCommand,
  uninstallSubCommand,
} from "../helpers/package-manager-utils"
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

  const installCommandArgs = [installSubCommand[packageManager]]
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

  const uninstallCommandArgs = [
    uninstallSubCommand[packageManager],
    ...packageNames,
  ]

  logDebug(
    `Uninstalling dependencies with command:`,
    prettyCommand(packageManager, uninstallCommandArgs)
  )
  await runCommand(packageManager, uninstallCommandArgs)
}

export const getNameVersionCombo = (npmPackage: Package): string => {
  return `${npmPackage.name}@${npmPackage.version}`
}

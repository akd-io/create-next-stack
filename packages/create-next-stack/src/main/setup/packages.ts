import { PackageManager } from "../create-next-stack-types"
import {
  installSubCommandMap,
  saveDevModifierMap,
  uninstallSubCommandMap,
} from "../helpers/package-manager-utils"
import { prettyCommand } from "../helpers/pretty-command"
import { runCommand } from "../helpers/run-command"
import { logDebug } from "../logging"

type Package<T = string> = Readonly<{
  name: T
  version: string
}>

type InstallPackageOptions = {
  dev?: boolean
}
export const install = async (
  npmPackage: Package | Package[],
  packageManager: PackageManager,
  options?: InstallPackageOptions
): Promise<void> => {
  const packageArray = Array.isArray(npmPackage) ? npmPackage : [npmPackage]

  if (packageArray.length < 1) return

  const packagesWithVersions = packageArray.map((pkg) =>
    getNameVersionCombo(pkg)
  )

  const installCommandArgs = [installSubCommandMap[packageManager]]
  if (typeof options?.dev == "boolean" && options.dev) {
    installCommandArgs.push(saveDevModifierMap[packageManager])
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
  packageManager: PackageManager
): Promise<void> => {
  const packageArray = Array.isArray(npmPackage) ? npmPackage : [npmPackage]

  if (packageArray.length < 1) return

  const packageNames = packageArray.map((npmPackage) => npmPackage.name)

  const uninstallCommandArgs = [
    uninstallSubCommandMap[packageManager],
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

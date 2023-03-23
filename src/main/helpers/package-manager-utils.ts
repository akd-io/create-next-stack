import { PackageManagerOption } from "../create-next-stack-types"

export const installCommand: Record<PackageManagerOption, string> = {
  yarn: "yarn",
  npm: "npm install",
}

export const cleanInstallCommand: Record<PackageManagerOption, string> = {
  yarn: "yarn install",
  npm: "npm ci",
}

export const installSubCommand: Record<PackageManagerOption, string> = {
  yarn: "add",
  npm: "install",
}

export const uninstallSubCommand: Record<PackageManagerOption, string> = {
  yarn: "remove",
  npm: "uninstall",
}

export const runCommand: Record<PackageManagerOption, string> = {
  yarn: "yarn",
  npm: "npm run",
}

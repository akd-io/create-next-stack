import { PackageManager } from "../create-next-stack-types"

export const installCommandMap: Record<PackageManager, string> = {
  pnpm: "pnpm install",
  yarn: "yarn",
  npm: "npm install",
}

export const cleanInstallCommandMap: Record<PackageManager, string> = {
  pnpm: "pnpm install --frozen-lockfile",
  yarn: "yarn install --frozen-lockfile",
  npm: "npm ci",
}

export const installSubCommandMap: Record<PackageManager, string> = {
  pnpm: "add",
  yarn: "add",
  npm: "install",
}

export const uninstallSubCommandMap: Record<PackageManager, string> = {
  pnpm: "remove",
  yarn: "remove",
  npm: "uninstall",
}

export const runCommandMap: Record<PackageManager, string> = {
  pnpm: "pnpm",
  yarn: "yarn",
  npm: "npm run",
}

export const saveDevModifierMap: Record<PackageManager, string> = {
  pnpm: "--save-dev",
  yarn: "--dev",
  npm: "--save-dev",
}

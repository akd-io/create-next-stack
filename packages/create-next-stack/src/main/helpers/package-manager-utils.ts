import type { PackageManager } from "../create-next-stack-types.ts"

export const installCommandMap: Record<PackageManager, string> = {
  pnpm: "pnpm install",
  yarn: "yarn",
  npm: "npm install",
  bun: "bun install",
}

export const cleanInstallCommandMap: Record<PackageManager, string> = {
  pnpm: "pnpm install --frozen-lockfile",
  yarn: "yarn install --frozen-lockfile",
  npm: "npm ci",
  bun: "bun install --frozen-lockfile",
}

export const installSubCommandMap: Record<PackageManager, string> = {
  pnpm: "add",
  yarn: "add",
  npm: "install",
  bun: "add",
}

export const uninstallSubCommandMap: Record<PackageManager, string> = {
  pnpm: "remove",
  yarn: "remove",
  npm: "uninstall",
  bun: "remove",
}

export const runCommandMap: Record<PackageManager, string> = {
  pnpm: "pnpm",
  yarn: "yarn",
  npm: "npm run",
  bun: "bun run",
}

export const saveDevModifierMap: Record<PackageManager, string> = {
  pnpm: "--save-dev",
  yarn: "--dev",
  npm: "--save-dev",
  bun: "--dev",
}

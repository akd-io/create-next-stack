import execa from "execa"

type Package = {
  readonly name: string
  readonly minVersion: string
}

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
  if (options != null && options.dev != null && options.dev) {
    installCommandArgs.push("--dev")
  }
  packagesWithVersions.forEach((packageWithVersion) => {
    installCommandArgs.push(packageWithVersion)
  })
  await execa(packageManager, installCommandArgs)
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
  await execa(packageManager, uninstallCommandArgs)
}

export const getNameVersionCombo = (npmPackage: Package): string => {
  return `${npmPackage.name}@^${npmPackage.minVersion}`
}

export const packages = {
  yarn: {
    name: "yarn",
    minVersion: "1.0.0",
  },
  prettier: {
    name: "prettier",
    minVersion: "2.0.0",
  },
  "eslint-config-prettier": {
    name: "eslint-config-prettier",
    minVersion: "8.0.0",
  },
  "@emotion/react": {
    name: "@emotion/react",
    minVersion: "11.0.0",
  },
  "@emotion/styled": {
    name: "@emotion/styled",
    minVersion: "11.0.0",
  },
  "@emotion/babel-plugin": {
    name: "@emotion/babel-plugin",
    minVersion: "11.0.0",
  },
  "styled-components": {
    name: "styled-components",
    minVersion: "5.0.0",
  },
  "@types/styled-components": {
    name: "@types/styled-components",
    minVersion: "5.0.0",
  },
  sass: {
    name: "sass",
    minVersion: "1.0.0",
  },
  "babel-plugin-styled-components": {
    name: "babel-plugin-styled-components",
    minVersion: "1.0.0",
  },
  "react-hook-form": {
    name: "react-hook-form",
    minVersion: "7.0.0",
  },
  formik: {
    name: "formik",
    minVersion: "2.0.0",
  },
  "framer-motion": {
    name: "framer-motion",
    minVersion: "4.0.0",
  },
  "create-next-app": {
    name: "create-next-app",
    minVersion: "11.0.0",
  },
  mrm: {
    name: "mrm",
    minVersion: "3.0.0",
  },
  "mrm-task-lint-staged": {
    name: "mrm-task-lint-staged",
    minVersion: "6.0.0",
  },
} as const

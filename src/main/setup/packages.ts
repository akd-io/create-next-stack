import execa from "execa"

type Package = {
  readonly name: string
  readonly version: string
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
  return `${npmPackage.name}@${npmPackage.version}`
}

// TODO: Strengthen packages type using a Constrained Identity Function
export const packages = {
  yarn: {
    name: "yarn",
    version: "^1.0.0",
  },
  prettier: {
    name: "prettier",
    version: "^2.0.0",
  },
  "eslint-config-prettier": {
    name: "eslint-config-prettier",
    version: "^8.0.0",
  },
  "@emotion/react": {
    name: "@emotion/react",
    version: "^11.0.0",
  },
  "@emotion/styled": {
    name: "@emotion/styled",
    version: "^11.0.0",
  },
  "@emotion/babel-plugin": {
    name: "@emotion/babel-plugin",
    version: "^11.0.0",
  },
  "styled-components": {
    name: "styled-components",
    version: "^5.0.0",
  },
  "@types/styled-components": {
    name: "@types/styled-components",
    version: "^5.0.0",
  },
  sass: {
    name: "sass",
    version: "^1.0.0",
  },
  "babel-plugin-styled-components": {
    name: "babel-plugin-styled-components",
    version: "^1.0.0",
  },
  "react-hook-form": {
    name: "react-hook-form",
    version: "^7.0.0",
  },
  formik: {
    name: "formik",
    version: "^2.0.0",
  },
  "framer-motion": {
    name: "framer-motion",
    version: "^4.0.0",
  },
  "create-next-app": {
    name: "create-next-app",
    version: "~11.1.0", // Note: Equivalent to 11.1.x. However, when used with npx, the version range is interpreted exactly instead.
  },
  mrm: {
    name: "mrm",
    version: "^3.0.0",
  },
  "mrm-task-lint-staged": {
    name: "mrm-task-lint-staged",
    version: "^6.0.0",
  },
  "@chakra-ui/icons": {
    name: "@chakra-ui/icons",
    version: "^1.0.0",
  },
  "@chakra-ui/react": {
    name: "@chakra-ui/react",
    version: "^1.0.0",
  },
  "@material-ui/core": {
    name: "@material-ui/core",
    version: "^4.0.0",
  },
  "@material-ui/icons": {
    name: "@material-ui/icons",
    version: "^4.0.0",
  },
} as const

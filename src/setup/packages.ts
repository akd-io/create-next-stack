import execa from "execa"

type Package = {
  readonly name: string
  readonly minVersion: string
}

type InstallPackageOptions = {
  dev?: boolean
}
export const yarnAdd = async (
  npmPackage: Package | Package[],
  options?: InstallPackageOptions
) => {
  const packageArray = Array.isArray(npmPackage) ? npmPackage : [npmPackage]

  const packagesWithVersions = packageArray.map((pkg) =>
    getQuotedNameVersionCombo(pkg)
  )

  let yarnAddCommand = "yarn add"
  if (options != null && options.dev != null && options.dev) {
    yarnAddCommand += " --dev"
  }
  packagesWithVersions.forEach((packageWithVersion) => {
    yarnAddCommand += ` ${packageWithVersion}`
  })
  return execa(yarnAddCommand)
}

export const getQuotedNameVersionCombo = (npmPackage: Package) => {
  return `"${npmPackage.name}@^${npmPackage.minVersion}"`
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

/**
  This code is a slightly modified version of the same code from the Create Next App repository.

  `validateNpmName` from: https://github.com/vercel/next.js/blob/e8a9bd19967c9f78575faa7d38e90a1270ffa519/packages/create-next-app/helpers/validate-pkg.ts
  `validateProjectName` from: https://github.com/vercel/next.js/blob/canary/packages/create-next-app/index.ts
*/

import path from "path"
import validateNpmPackageName from "validate-npm-package-name"

type Validation = {
  valid: boolean
  problems?: string[]
}

function validateNpmName(name: string): Validation {
  const nameValidation = validateNpmPackageName(name)
  if (nameValidation.validForNewPackages) {
    return { valid: true }
  }

  return {
    valid: false,
    problems: [
      ...(nameValidation.errors || []),
      ...(nameValidation.warnings || []),
    ],
  }
}

export const validateProjectName = (projectName: string): Validation => {
  return validateNpmName(path.basename(path.resolve(projectName)))
}

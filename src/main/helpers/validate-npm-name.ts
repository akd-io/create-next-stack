import validateNpmPackageName from "validate-npm-package-name"

/**
 * This code is a slightly modified version of the same code from the Create Next App repository.
 * From: https://github.com/vercel/next.js/blob/e8a9bd19967c9f78575faa7d38e90a1270ffa519/packages/create-next-app/helpers/validate-pkg.ts
 */
export const validateNpmName = (
  name: string
): {
  valid: boolean
  problems: string[]
} => {
  const nameValidation = validateNpmPackageName(name)
  if (nameValidation.validForNewPackages) {
    return { valid: true, problems: [] }
  }

  return {
    valid: false,
    problems: [
      ...(nameValidation.errors ?? []),
      ...(nameValidation.warnings ?? []),
    ],
  }
}

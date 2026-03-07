import endent from "endent"
import { ValidCNSInputs } from "../../../create-next-stack-types"

export const generateEslintConfig = async ({
  flags,
}: ValidCNSInputs): Promise<string> => {
  const imports = [
    `import { defineConfig, globalIgnores } from "eslint/config"`,
    `import nextVitals from "eslint-config-next/core-web-vitals"`,
    `import nextTs from "eslint-config-next/typescript"`,
  ]

  const configs = [`...nextVitals`, `...nextTs`]

  if (flags.prettier) {
    imports.push(`import eslintConfigPrettier from "eslint-config-prettier"`)
    configs.push(`eslintConfigPrettier`)
  }

  const configEntries = configs.map((c) => `    ${c},`).join("\n")

  return endent`
    ${imports.join("\n")}

    const eslintConfig = defineConfig([
    ${configEntries}
      globalIgnores([
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
      ]),
    ])

    export default eslintConfig
  `
}

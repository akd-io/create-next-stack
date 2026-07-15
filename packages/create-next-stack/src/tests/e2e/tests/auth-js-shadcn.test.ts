import { exists } from "../../../main/helpers/exists.ts"
import { testArgsWithFinalChecks } from "../helpers/test-args.ts"
import { twentyMinutes } from "../helpers/timeout.ts"

test(
  "testAuthJsAndShadcn",
  async () => {
    const { runDirectory } = await testArgsWithFinalChecks([
      "--debug",
      "--package-manager=pnpm",
      "--styling=tailwind-css",
      "--auth-js",
      "--shadcn",
      ".",
    ])

    // Auth.js files
    const authTsExists = await exists(`${runDirectory}/auth.ts`)
    expect(authTsExists).toBe(true)

    const authRouteExists = await exists(
      `${runDirectory}/app/api/auth/[...nextauth]/route.ts`,
    )
    expect(authRouteExists).toBe(true)

    const proxyExists = await exists(`${runDirectory}/proxy.ts`)
    expect(proxyExists).toBe(true)

    // shadcn/ui files
    const componentsJsonExists = await exists(`${runDirectory}/components.json`)
    expect(componentsJsonExists).toBe(true)

    const utilsExists = await exists(`${runDirectory}/lib/utils.ts`)
    expect(utilsExists).toBe(true)
  },
  twentyMinutes,
)

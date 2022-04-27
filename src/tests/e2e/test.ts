import chalk from "chalk"
import { exitWithError } from "./helpers/exit-with-error"
import { setGitNameAndEmail } from "./helpers/set-git-name-and-email"
import { logTestInfo } from "./test-logging"
import { testNoFlags } from "./tests/non-interactive/test-no-flags"
import { testCssModulesWithSassAllFlags } from "./tests/non-interactive/css-modules-with-sass/css-modules-with-sass-all-flags"
import { testCssModulesWithSassOnly } from "./tests/non-interactive/css-modules-with-sass/css-modules-with-sass-only"
import { testCssModulesAllFlags } from "./tests/non-interactive/css-modules/css-modules-all-flags"
import { testCssModulesOnly } from "./tests/non-interactive/css-modules/css-modules-only"
import { testEmotionAllFlags } from "./tests/non-interactive/emotion/emotion-all-flags"
import { testEmotionOnly } from "./tests/non-interactive/emotion/emotion-only"
import { testStyledComponentsAllFlags } from "./tests/non-interactive/styled-components/styled-components-all-flags"
import { testStyledComponentsOnly } from "./tests/non-interactive/styled-components/styled-components-only"
import { testTailwindCssAllFlags } from "./tests/non-interactive/tailwind-css/tailwind-css-all-flags"
import { testTailwindCssOnly } from "./tests/non-interactive/tailwind-css/tailwind-css-only"
import { testHelpFlag } from "./tests/non-interactive/test-help-flag"
import { testInvalidInputs } from "./tests/non-interactive/test-invalid-inputs"
import { testVersionFlag } from "./tests/non-interactive/test-version-flag"
;(async () => {
  // TODO: Find a way to run tests in parallel. Currently failing because simultaneous calls to `npm i -g yarn` or `npm install -g mrm@^3.0.0 mrm-task-lint-staged@^6.0.0` cause crashes.

  try {
    // If not done already, Set Git name and email so `git commit` doesn't fail during create-next-app
    await setGitNameAndEmail()

    const createNextStackDir = process.cwd()

    // Help and Version commands
    await testHelpFlag(createNextStackDir)
    await testVersionFlag(createNextStackDir)

    // Invalid inputs
    await testInvalidInputs(createNextStackDir)

    // No flags test
    await testNoFlags(createNextStackDir)

    // Styling only
    await testEmotionOnly(createNextStackDir)
    await testStyledComponentsOnly(createNextStackDir)
    await testTailwindCssOnly(createNextStackDir)
    await testCssModulesOnly(createNextStackDir)
    await testCssModulesWithSassOnly(createNextStackDir)

    // All flags
    await testEmotionAllFlags(createNextStackDir)
    await testStyledComponentsAllFlags(createNextStackDir)
    await testTailwindCssAllFlags(createNextStackDir)
    await testCssModulesAllFlags(createNextStackDir)
    await testCssModulesWithSassAllFlags(createNextStackDir)

    logTestInfo("")
    logTestInfo(chalk.green("Tests successful!"))
    logTestInfo("")
  } catch (error) {
    exitWithError(error)
  }
})()

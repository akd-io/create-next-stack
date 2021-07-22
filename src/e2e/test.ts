import { exitWithError } from "./helpers/exit-with-error"
import { setGitNameAndEmail } from "./helpers/set-git-name-and-email"
import { testDefaultOptionsInteractive } from "./tests/interactive/default-options"
import { testCssModulesAllFlagsNonInteractive } from "./tests/non-interactive/css-modules/css-modules-all-flags"
import { testCssModulesOnlyNonInteractive } from "./tests/non-interactive/css-modules/css-modules-only"
import { testEmotionAllFlagsNonInteractive } from "./tests/non-interactive/emotion/emotion-all-flags"
import { testEmotionOnlyNonInteractive } from "./tests/non-interactive/emotion/emotion-only"
import { testStyledComponentsAllFlagsNonInteractive } from "./tests/non-interactive/styled-components/styled-components-all-flags"
import { testStyledComponentsOnlyNonInteractive } from "./tests/non-interactive/styled-components/styled-components-only"
;(async () => {
  try {
    // If not done already, Set Git name and email so `git commit` doesn't fail during create-next-app
    await setGitNameAndEmail()

    await Promise.all([
      testDefaultOptionsInteractive(),

      // Styling only
      testEmotionOnlyNonInteractive(),
      testStyledComponentsOnlyNonInteractive(),
      testCssModulesOnlyNonInteractive(),

      // All flags
      testEmotionAllFlagsNonInteractive(),
      testStyledComponentsAllFlagsNonInteractive(),
      testCssModulesAllFlagsNonInteractive(),
    ])
  } catch (error) {
    exitWithError(error)
  }
})()

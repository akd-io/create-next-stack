import { exitWithError } from "./helpers/exit-with-error"
import { setGitNameAndEmail } from "./helpers/set-git-name-and-email"
import { testDefaultOptions } from "./tests/default-options"
;(async () => {
  try {
    // If not done already, Set Git name and email so `git commit` doesn't fail during create-next-app
    await setGitNameAndEmail()

    await testDefaultOptions()
  } catch (error) {
    exitWithError(error)
  }
})()

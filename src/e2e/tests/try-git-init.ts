import { execSync } from "child_process"
import console from "console"
import path from "path"
import rimraf from "rimraf"

// TODO: Remove file when isGitInitialized bug is fixed

function isInGitRepository(): boolean {
  try {
    console.log("Running git rev-parse --is-inside-work-tree")
    execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" })
    return true
  } catch (_) {}
  return false
}

function isInMercurialRepository(): boolean {
  try {
    console.log("hg --cwd . root")
    execSync("hg --cwd . root", { stdio: "ignore" })
    return true
  } catch (_) {}
  return false
}

export function tryGitInit(root: string): boolean {
  let didInit = false
  try {
    console.log("git --version")
    execSync("git --version", { stdio: "ignore" })

    const inGitRepository = isInGitRepository()
    if (inGitRepository) console.log("Is in Git repository")

    const inMercurialRepository = isInMercurialRepository()
    if (inMercurialRepository) console.log("Is in Mercurial repository")

    if (inGitRepository || inMercurialRepository) {
      return false
    }

    console.log("git init")
    execSync("git init", { stdio: "ignore" })

    didInit = true

    console.log("git checkout -b main")
    execSync("git checkout -b main", { stdio: "ignore" })

    console.log("git add -A")
    execSync("git add -A", { stdio: "ignore" })

    console.log('git commit -m "Initial commit from Create Next App"')
    execSync('git commit -m "Initial commit from Create Next App"', {
      stdio: "ignore",
    })

    return true
  } catch (e) {
    if (didInit) {
      console.log("Removing .git")
      try {
        rimraf.sync(path.join(root, ".git"))
      } catch (_) {}
    }
    return false
  }
}

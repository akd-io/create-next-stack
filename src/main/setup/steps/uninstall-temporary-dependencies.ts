import { Step } from "../../plugin"
import { uninstall } from "../packages"
import { plugins } from "../setup"

export const uninstallTemporaryDependenciesStep: Step = {
  description: "uninstalling temporary dependencies",
  run: async ({ flags }) => {
    const tmpDeps = plugins.flatMap((plugin) => {
      return plugin.tmpDependencies != null
        ? Object.values(plugin.tmpDependencies)
        : []
    })

    if (tmpDeps.length > 0) {
      await uninstall(tmpDeps, flags["package-manager"])
    }
  },
}

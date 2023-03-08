import { constrain } from "../../helpers/constrain"
import { Step } from "../../plugin"
import { install } from "../packages"
import { filterPlugins, plugins } from "../setup"

export const installDependenciesStep = constrain<Step>()({
  description: "installing dependencies",
  run: async (inputs) => {
    const { flags } = inputs

    const depsAndTmpDeps = filterPlugins(inputs).flatMap((plugin) => {
      return [
        ...(plugin.dependencies != null
          ? Object.values(plugin.dependencies)
          : []),
        ...(plugin.tmpDependencies != null
          ? Object.values(plugin.tmpDependencies)
          : []),
      ]
    })

    const devDeps = plugins.flatMap((plugin) => {
      return plugin.devDependencies != null
        ? Object.values(plugin.devDependencies)
        : []
    })

    if (depsAndTmpDeps.length > 0) {
      await install(depsAndTmpDeps, flags["package-manager"])
    }
    if (devDeps.length > 0) {
      await install(devDeps, flags["package-manager"], { dev: true })
    }
  },
} as const)

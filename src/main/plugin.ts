import { ValidCNSInputs } from "./create-next-stack-types"
import { DeeplyReadonly } from "./helpers/deeply-readonly"

export const initializePlugin = (plugin: Plugin): InitializedPlugin => {
  return {
    // defaults
    // n/a

    // plugin
    ...plugin,

    // enhancements
    steps:
      plugin.steps != null
        ? Object.entries(plugin.steps).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]: createStep(value),
            }),
            {} as Record<string, InitializedStep>
          )
        : undefined,
  }
}

export const createStep = (step: Step): InitializedStep => {
  return {
    // defaults
    shouldRun: true,

    // step
    ...step,
  }
}

export type InitializedPlugin = Plugin & {
  steps?: Record<string, InitializedStep>
}
export type InitializedStep = Step & {
  shouldRun: NonNullable<Step["shouldRun"]>
}

export type Plugin = DeeplyReadonly<{
  /** Name of the plugin */
  name: string
  /** Description of the plugin */
  description: string
  /** The name of the styling method argument. Eg. "css-modules-with-sass" */
  stylingMethodArg?: string
  /** Dependencies that are added to the package.json file. */
  dependencies?: Record<string, Package>
  /** Dev dependencies that are added to the package.json file. */
  devDependencies?: Record<string, Package>
  /** Temporary dependencies uninstalled when Create Next Stack is done. */
  tmpDependencies?: Record<string, Package>
  /** External dependencies not installed by Create Next Stack, but used as references for custom run functions. For example used by Next.js plugin to call `npx create-next-app`. */
  extDependencies?: Record<string, Package>
  /** Technology descriptions */
  technologies?: Technology[]
  /** Scripts that are added to the package.json file. */
  scripts?: Script[]
  /** A series of functions that are run by Create Next Stack. */
  steps?: Record<string, Step>
}>

type Package = {
  /** Name of the package. */
  name: string
  /** Version of the package */
  version: string
}

type Technology = {
  /** The name of the technology. */
  name: string
  /** Description of a technology. This is displayed in the generated README.md file, as well as in the landing page's list of technologies. */
  description: string
  /** Links relevant for getting to know and learning the technology. */
  links: Array<{
    /** Title of the link. */
    title: string
    /** Url of the link. */
    url: string
  }>
}

/**
 * A script that is added to the package.json file.
 *
 * For example:
 * ```js
 * {
 *   name: "dev",
 *   description: "Runs the Next.js development server.",
 *   command: "next dev"
 * }
 * ```
 */
type Script = {
  /** Name of the script, eg. `dev` */
  name: string
  /** Description of the script, eg. "" */
  description: string
  /** The command run by the npm script, eg. `next dev` */
  command: string
}

export type Step = {
  /**
   * `description` should be written in present continuous tense, without punctuation, and with a lowercase first letter unless the description starts with a name or similar.
   *
   * Eg. "setting up Prettier" or "adding ESLint"
   */
  description: string
  // TODO: Consider memoizing shouldRun, as it is sometimes called multiple times. See the lint-staged setup step.
  /**
   * A boolean or function that determines whether the custom run function should run.
   *
   * Default is true.
   */
  shouldRun?: boolean | ((inputs: ValidCNSInputs) => Promise<boolean>)
  /** Custom run function. */
  run: (inputs: ValidCNSInputs) => Promise<void>
}

export const evalShouldRun = async (
  shouldRun: InitializedStep["shouldRun"],
  inputs: ValidCNSInputs
): Promise<boolean> => {
  if (typeof shouldRun === "function") return shouldRun(inputs)
  return shouldRun
}

import { NextConfig } from "next"
import { ValidCNSInputs } from "./create-next-stack-types"
import { DeeplyReadonly } from "./helpers/deeply-readonly"

type PluginConfig = DeeplyReadonly<{
  /** ID that uniquely identifies the plugin */
  id: string
  /** Name of the plugin */
  name: string
  /** Description of the plugin */
  description: string
  /** Whether the plugin is active or not. This determines if dependencies are installed, technologies and scripts added, steps run, and more. */
  active: boolean | ((inputs: ValidCNSInputs) => boolean)
  /** Dependencies that are added to the package.json file. */
  dependencies?: Record<string, Package>
  /** Dev dependencies that are added to the package.json file. */
  devDependencies?: Record<string, Package>
  /** Temporary dependencies uninstalled when Create Next Stack is done. */
  tmpDependencies?: Record<string, Package>
  /** Descriptions of the technologies supported by the plugin. */
  technologies?: Technology[]
  /** Scripts that are added to the package.json file. */
  scripts?: Script[]
  /** A series of functions that are run by Create Next Stack. */
  steps?: Record<string, RawStep>
  /** Compiler options to set. */
  compilerOptions?: NextConfig["compiler"]
  /**
   * Environment variables needed by the plugin.
   * These variables are added to the generated .env and README.md files.
   */
  environmentVariables?: Array<{
    /** Name of the environment variable. */
    name: string
    /** Description of the environment variable. */
    description: string
    /** Default value of the environment variable. */
    defaultValue: string
  }>
  /** Slots to fill in the generated files. */
  slots?: {
    /** Slots to fill in the _app.tsx file. The file is generated using the following template:
     *
     * ```ts
     * `
     * import { AppProps } from "next/app";
     * ${imports}
     *
     * const App = ({ Component, pageProps }: AppProps) => {
     *   ${logic}
     *   return (
     *     <>
     *       ${componentsStart}
     *         <Component {...pageProps} />
     *       ${componentsEnd}
     *     </>
     *   )
     * };
     *
     * export default App;
     * `
     * ```
     */
    app?: {
      /** Code to add to the imports section of the _app.tsx file. */
      imports?: string
      /** Code to add before the return statement of the App function in the _app.tsx file. */
      logic?: string
      /** Code to add to the start of the components section of the _app.tsx file. */
      componentsStart?: string
      /** Code to add to the end of the components section of the _app.tsx file. */
      componentsEnd?: string
    }
    /** Slots to fill in the _document.tsx file. The file is generated using the following template:
     * ```ts
     * `
     * import NextDocument, { Html, Head, Main, NextScript } from "next/document";
     * ${imports}
     *
     * export default class Document extends NextDocument {
     *   render() {
     *     return (
     *       <Html lang="en" ${htmlAttributes}>
     *         <Head>
     *           ${headTags}
     *         </Head>
     *         <body>
     *           ${body}
     *           <Main />
     *           <NextScript />
     *         </body>
     *       </Html>
     *     );
     *   }
     * }
     * `
     * ```
     */
    document?: {
      /** Code to add to the imports section of the _document.tsx file. */
      imports?: string
      /** Code to add after the imports section of the _document.tsx file. */
      afterImports?: string
      /** Code to add to the class members of the Document class in _document.tsx file. */
      classMembers?: string
      /** Code to add before the return statement of the Document render function in _document.tsx file. */
      renderLogic?: string
      /** Code to add to the attributes of the <Html> tag of the _document.tsx file. */
      htmlAttributes?: string
      /** Code to add to the <Head> tag of the _document.tsx file. */
      headTags?: string
      /** Code to add to the <body> tag of the _document.tsx file. */
      body?: string
    }
  }
}>

export type Package = {
  /** Name of the package. */
  name: string
  /** Version of the package */
  version: string
}

export type Technology = {
  /** ID that uniquely identified the technology across all plugins' technologies. */
  id: string
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

type RawStep = {
  /** ID that uniquely identified the technology across all plugins' steps. */
  id: string

  /**
   * `description` should be written in present continuous tense, without punctuation, and with a lowercase first letter unless the description starts with a name or similar.
   *
   * Eg. "setting up Prettier" or "adding ESLint"
   */
  description: string

  /**
   * A boolean or function that determines whether the custom run function should run.
   *
   * Default is true
   */
  shouldRun?: boolean | ((inputs: ValidCNSInputs) => Promise<boolean> | boolean)

  /** Custom run function. */
  run: (inputs: ValidCNSInputs) => Promise<void>
}

export const createPlugin = <TPluginConfig extends PluginConfig>(
  pluginConfig: TPluginConfig
): Plugin<TPluginConfig> => {
  const plugin = {
    ...pluginConfig,
  }
  const enhancements = {
    steps:
      pluginConfig.steps != null
        ? Object.entries(pluginConfig.steps).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]: createStep(value, plugin as Plugin<TPluginConfig>),
            }),
            {} as Record<string, Step>
          )
        : undefined,
  }
  for (const [key, value] of Object.entries(enhancements)) {
    Object.defineProperty(plugin, key, {
      value,
      enumerable: true,
    })
  }
  return plugin as Plugin<TPluginConfig>
}

export const createStep = <TRawStep extends RawStep = RawStep>(
  step: TRawStep,
  plugin: Plugin
): Step<TRawStep> => {
  return {
    // defaults
    shouldRun: true,

    // TODO: Consider memoizing shouldRun, as it is sometimes called multiple times. See the lint-staged setup step.

    // step
    ...step,

    // enhancements
    plugin,
  }
}

export type Plugin<TPluginConfig extends PluginConfig = PluginConfig> =
  TPluginConfig & {
    steps?: {
      [key in keyof TPluginConfig["steps"]]: Step<RawStep> // TODO: Fix type. This should be Step<TPluginConfig["steps"][key]>, but that doesn't work.
    }
  }

export type Step<TStep extends RawStep = RawStep> = TStep & {
  shouldRun: NonNullable<RawStep["shouldRun"]>
  plugin: Plugin
}

export const evalActive = (
  active: PluginConfig["active"],
  inputs: ValidCNSInputs
): boolean => {
  if (typeof active === "function") return active(inputs)
  return active
}

export const evalShouldRun = async (
  shouldRun: Step["shouldRun"],
  inputs: ValidCNSInputs
): Promise<boolean> => {
  if (typeof shouldRun === "function") return await shouldRun(inputs)
  return shouldRun
}

import { NextConfig } from "next"
import { ValidCNSInputs } from "./create-next-stack-types"

export type Plugin = {
  /** ID that uniquely identifies the plugin */
  id: string
  /** Name of the plugin */
  name: string
  /** Description of the plugin */
  description: string
  /** Whether the plugin is active or not. This determines if dependencies are installed, technologies and scripts added, steps run, and more. */
  active: boolean | ((inputs: ValidCNSInputs) => boolean | Promise<boolean>)
  /** Dependencies that are added to the package.json file. */
  dependencies?: Package[]
  /** Dev dependencies that are added to the package.json file. */
  devDependencies?: Package[]
  /** Temporary dependencies uninstalled when Create Next Stack is done. */
  tmpDependencies?: Package[]
  /** Descriptions of the technologies supported by the plugin. */
  technologies?: Technology[]
  /** Scripts that are added to the package.json file. */
  scripts?: Script[]
  /** A series of functions that are run by Create Next Stack. */
  steps?: Step[]
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
  /**
   * List of things to be done manually by the user after a project has been created.
   * The list will be added to the generated landing page, the README.md file and written to the console.
   */
  todos?: string[]
  /** Files to be added by the plugin. */
  addFiles?: Array<{
    /** Destination of the file to add. */
    destination: string
    /** Content of the file. */
    content: string | ((inputs: ValidCNSInputs) => string | Promise<string>)
    /**
     * Condition to determine if the file should be added.
     *
     */
    condition?:
      | boolean
      | ((inputs: ValidCNSInputs) => boolean | Promise<boolean>)
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
     * ${postImports}
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
      /** Code to add after the imports section of the _app.tsx file. */
      postImports?: string
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
     * ${afterImports}
     *
     * export default class Document extends NextDocument {
     *   ${classMembers}
     *   render() {
     *     ${renderLogic}
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
      /** Code to add to the imports section of the `_document.tsx` file. */
      imports?: string
      /** Code to add after the imports section of the `_document.tsx` file. */
      afterImports?: string
      /** Code to add to the class members of the `Document` class in `_document.tsx` file. */
      classMembers?: string
      /** Code to add before the return statement of the `Document` render function in `_document.tsx` file. */
      renderLogic?: string
      /** Code to add to the attributes of the <Html> tag of the `_document.tsx` file. */
      htmlAttributes?: string
      /** Code to add to the <Head> tag of the `_document.tsx` file. */
      headTags?: string
      /** Code to add to the <body> tag of the `_document.tsx` file. */
      body?: string
    }
    /**
     * Slots to fill in the next.config.js file. The file is generated using the following template:
     *
     * ```js
     * `
     * ${imports}
     *
     * const nextConfig = {
     *   reactStrictMode: true,
     *   ${...nextConfig}
     * };
     *
     * module.exports = ${wrappersStart}nextConfig${wrappersEnd};
     * `
     * ```
     */
    nextConfigJs?: {
      /** Code to add to the imports section of the `next.config.js` file. */
      imports?: string
      /** JSON object to merge into the `nextConfig` object of the `next.config.js` file. */
      nextConfig?: NextConfig
      /** Code to add to the start of the export of the `nextConfig` object of the `next.config.js` file. */
      wrappersStart?: string
      /** Code to add to the end of the export of the `nextConfig` object of the `next.config.js` file. */
      wrappersEnd?: string
    }
  }
}

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

export type Step = {
  /** ID that uniquely identified the technology across all plugins' steps. */
  id: string
  /** A description of the step. It should be written in present continuous tense, without punctuation, and with a lowercase first letter unless the description starts with a name or similar. */
  description: string
  /** A boolean or function that determines whether the custom run function should run. Default is true. */
  shouldRun?: boolean | ((inputs: ValidCNSInputs) => Promise<boolean> | boolean)
  /** Custom run function. */
  run: (inputs: ValidCNSInputs) => Promise<void>
}

export const evalProperty = async <T extends boolean | string>(
  value: T | ((inputs: ValidCNSInputs) => T | Promise<T>),
  inputs: ValidCNSInputs
): Promise<T> => {
  if (typeof value === "function") return await value(inputs)
  return value
}

export const evalOptionalProperty = async <T extends boolean | string>(
  value: T | ((inputs: ValidCNSInputs) => T | Promise<T>) | undefined,
  inputs: ValidCNSInputs,
  defaultValue: Exclude<T, undefined>
): Promise<T> => {
  if (typeof value === "undefined") return defaultValue
  return await evalProperty(value, inputs)
}

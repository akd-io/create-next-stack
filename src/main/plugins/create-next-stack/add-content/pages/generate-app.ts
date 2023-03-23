import endent from "endent"
import { ValidCNSInputs } from "../../../../create-next-stack-types"
import { nonNull } from "../../../../helpers/non-null"
import { filterPlugins } from "../../../../setup/setup"

export const generateApp = (inputs: ValidCNSInputs): string => {
  const appImports = filterPlugins(inputs)
    .map((plugin) => {
      return plugin.slots?.app?.imports
    })
    .filter(nonNull)

  const componentsStart = filterPlugins(inputs)
    .map((plugin) => {
      return plugin.slots?.app?.componentsStart
    })
    .filter(nonNull)

  const componentsEnd = filterPlugins(inputs)
    .map((plugin) => {
      return plugin.slots?.app?.componentsEnd
    })
    .reverse()
    .filter(nonNull)

  return endent`
    import { AppProps } from "next/app";
    ${appImports.join("\n")}

    const App = ({ Component, pageProps }: AppProps) => {
      return (
        <>
          ${componentsStart}
            <Component {...pageProps} />
          ${componentsEnd}
        </>
      )
    };

    export default App;
  `
}

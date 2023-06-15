import endent from "endent"
import { ValidCNSInputs } from "../../../../create-next-stack-types"
import { nonNull } from "../../../../helpers/non-null"
import { filterPlugins } from "../../../../setup/setup"

export const generateApp = (inputs: ValidCNSInputs): string => {
  const imports = filterPlugins(inputs)
    .map((plugin) => plugin.slots?.app?.imports)
    .filter(nonNull)
    .join("\n")

  const postImports = filterPlugins(inputs)
    .map((plugin) => plugin.slots?.app?.postImports)
    .filter(nonNull)
    .join("\n")

  const logic = filterPlugins(inputs)
    .map((plugin) => plugin.slots?.app?.logic)
    .filter(nonNull)
    .join("\n\n") // Double new line to separate plugin logic

  const componentsStart = filterPlugins(inputs)
    .map((plugin) => plugin.slots?.app?.componentsStart)
    .filter(nonNull)
    .join("\n")

  const componentsEnd = filterPlugins(inputs)
    .map((plugin) => plugin.slots?.app?.componentsEnd)
    .filter(nonNull)
    .reverse()
    .join("\n")

  return endent`
    import { AppProps } from "next/app";
    ${imports}

    ${postImports}

    const App = ({ Component, pageProps }: AppProps) => {
      ${logic}
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

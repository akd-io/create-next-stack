import endent from "endent"
import { ValidCNSInputs } from "../../../create-next-stack-types"

type WrapperComponent = {
  openingTag: string
  closingTag: string
  filter: (inputs: ValidCNSInputs) => boolean
}

const wrapperComponents: WrapperComponent[] = [
  {
    //Chakra Provider
    openingTag: endent/* tsx */ `<ChakraProvider resetCSS theme={theme}>`,
    closingTag: endent/* tsx */ `</ChakraProvider>`,
    filter: ({ flags }) => Boolean(flags.chakra),
  },
  {
    //Chakra Color Mode Provider
    openingTag: endent/* tsx */ `
      <ColorModeProvider
        options={{
          initialColorMode: theme.config.initialColorMode,
          useSystemColorMode: theme.config.useSystemColorMode,
        }}
      >
    `,
    closingTag: endent/* tsx */ `</ColorModeProvider>`,
    filter: ({ flags }) => Boolean(flags.chakra),
  },
]

export const generateApp = (inputs: ValidCNSInputs): string => {
  const wrappers = wrapperComponents.filter((wrapper) => wrapper.filter(inputs))
  const openingTags = wrappers.map((wrapper) => wrapper.openingTag).join("\n")
  const closingTags = wrappers
    .reverse()
    .map((wrapper) => wrapper.closingTag)
    .join("\n")

  return endent/* tsx */ `
    import { AppProps } from "next/app";
    ${getChakraUIImports(inputs)}
    ${getGlobalStylesImport(inputs)}

    const CustomApp = ({ Component, pageProps }: AppProps) => {
      return (
        ${openingTags}
        <Component {...pageProps} />
        ${closingTags}
      )
    };

    export default CustomApp;
  `
}

const getGlobalStylesImport = ({ flags }: ValidCNSInputs) => {
  const { styling } = flags
  if (styling === "css-modules" || styling === "css-modules-with-sass") {
    const extension = styling === "css-modules" ? "css" : "scss"
    return /* tsx */ `import "../styles/global-styles.${extension}";`
  } else {
    return ""
  }
}

const getChakraUIImports = ({ flags }: ValidCNSInputs) => {
  return flags.chakra
    ? endent/* tsx */ `
        import {
          ChakraProvider,
          ColorModeProvider,
        } from "@chakra-ui/react";
        import { theme } from "../theme";
      `
    : ""
}

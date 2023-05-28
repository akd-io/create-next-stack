import { ChakraProvider } from "@chakra-ui/react"
import PlausibleProvider from "next-plausible"
import { AppProps } from "next/app"
import { theme } from "../theme"

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <PlausibleProvider domain="create-next-stack.com">
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </PlausibleProvider>
  )
}

export default CustomApp

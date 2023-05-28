import { ChakraProvider } from "@chakra-ui/react"
import { AppProps } from "next/app"
import Script from "next/script"
import { theme } from "../theme"

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <Script
        data-domain="create-next-stack.com"
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
      />
    </ChakraProvider>
  )
}

export default CustomApp

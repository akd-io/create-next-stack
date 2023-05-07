import { ChakraProvider } from "@chakra-ui/react"
import { AppProps } from "next/app"
import { theme } from "../theme"

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default CustomApp

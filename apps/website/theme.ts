import { extendTheme, ThemeConfig } from "@chakra-ui/react"

const colors = {
  brand: {
    600: "#6838F1",
    500: "#A746F2",
    400: "#DC51F2",
  },
}

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

export const theme = extendTheme({
  colors,
  config,
  fonts: {
    heading: `"Inter", sans-serif`,
    body: `"Inter", sans-serif`,
    mono: `"Roboto Mono", monospace`,
  },
})

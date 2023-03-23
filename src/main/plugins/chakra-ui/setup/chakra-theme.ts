import endent from "endent"

export const chakraTheme = endent`
  import { extendTheme, ThemeConfig } from "@chakra-ui/react";

  const colors = {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  };

  const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
  };

  export const chakraTheme = extendTheme({ colors, config });
`
